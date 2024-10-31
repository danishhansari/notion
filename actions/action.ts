"use server";

import { db } from "@/db";
import { documentSchema, roomSchema, userSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function createNewDocument() {
  try {
    auth.protect();
    const { sessionClaims } = await auth();
    if (!sessionClaims || !sessionClaims.email) {
      throw new Error("User not authenticated");
    }
    const documentRefs = await db
      .insert(documentSchema)
      .values({ title: "New Document" })
      .returning();

    const documentRef = documentRefs[0];
    if (!documentRef) {
      throw new Error("Document created failed");
    }

    // check if user already exists
    const existingUser = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, sessionClaims.email))
      .execute();

    if (existingUser.length === 0) {
      await db.insert(userSchema).values({ email: sessionClaims?.email! });
    }

    await db.insert(roomSchema).values({
      roomId: documentRef.id || 0,
      userId: sessionClaims.email,
      role: "owner",
    });

    return { docId: documentRef.id };
  } catch (err) {
    console.log("Error while creating document", err);
    throw new Error(`${err}`);
  }
}

export async function getAllDocument() {
  auth.protect();
  const { sessionClaims } = await auth();
  if (!sessionClaims || !sessionClaims.email) {
    throw new Error("Error in session claims");
  }
  const document = await db.query.roomSchema.findMany({
    where: eq(roomSchema.userId, sessionClaims?.email!),
    with: {
      document: true,
      user: true,
    },
  });
  console.log(document);
  return document;
}
