import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";

export const documentSchema = pgTable("document", {
  id: serial("id").primaryKey(),
  title: text("title"),
});

export const userSchema = pgTable("users", {
  email: text("email").notNull().primaryKey(),
});

export const roomSchema = pgTable("rooms", {
  userId: text("user_id")
    .notNull()
    .references(() => userSchema.email),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  roomId: integer("room_id")
    .notNull()
    .references(() => documentSchema.id),
});