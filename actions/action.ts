"use server";

import { db } from "@/db";
import { documentSchema, roomSchema, userSchema } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

// export async function createNewDocument() {
//   auth.protect();
//   const { sessionClaims } = await auth();
//   const documentRef = await db
//     .insert(documentSchema)
//     .values({ title: "New Document" })
//     .returning();

//   await db.insert(userSchema).values({ email: sessionClaims?.email! });
//   await db.insert(roomSchema).values({
//     roomId: documentRef[0].id || 0,
//     userId: sessionClaims?.email!,
//     role: "owner",
//   });
//   return { docId: documentRef[0].id };
// }

export async function createNewDocument() {
  try {
    auth.protect();
    const { sessionClaims } = await auth();

    if (!sessionClaims || !sessionClaims.email) {
      throw new Error("User not authenticated.");
    }

    const documentRefs = await db
      .insert(documentSchema)
      .values({ title: "New Document" })
      .returning();

    const documentRef = documentRefs[0];
    if (!documentRef) {
      throw new Error("Document creation failed.");
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, sessionClaims.email))
      .execute();

    if (existingUser.length === 0) {
      await db.insert(userSchema).values({ email: sessionClaims.email });
    }

    await db.insert(roomSchema).values({
      roomId: documentRef.id || 0,
      userId: sessionClaims.email,
      role: "owner",
    });

    return { docId: documentRef.id };
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
}
