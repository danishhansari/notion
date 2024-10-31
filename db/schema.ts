import { relations } from "drizzle-orm";
import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";

export const documentSchema = pgTable("document", {
  id: serial("id").primaryKey(),
  title: text("title"),
});

export const userSchema = pgTable("users", {
  email: text("email").notNull().primaryKey(),
});

export const roomSchema = pgTable("rooms", {
  userId: text("user_id").references(() => userSchema.email, {
    onDelete: "cascade",
  }),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  roomId: integer("room_id").references(() => documentSchema.id, {
    onDelete: "cascade",
  }),
});

export const documentRelations = relations(documentSchema, ({ many }) => ({
  rooms: many(roomSchema),
}));

export const userRelations = relations(userSchema, ({ many }) => ({
  rooms: many(roomSchema),
}));

export const roomRelations = relations(roomSchema, ({ one }) => ({
  user: one(userSchema, {
    fields: [roomSchema.userId],
    references: [userSchema.email],
  }),
  document: one(documentSchema, {
    fields: [roomSchema.roomId],
    references: [documentSchema.id],
  }),
}));
