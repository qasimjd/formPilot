import { timestamp, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const JsonForms = pgTable("jsonForms", {

    id: uuid("id").defaultRandom().primaryKey(),
    formData: text("form_data").notNull(),
    createdBy: varchar("created_by", { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
