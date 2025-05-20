import { timestamp, pgTable, text, uuid, varchar, pgEnum } from "drizzle-orm/pg-core";

export const themeEnum = pgEnum('theme_type', ['dark', 'light']);

export const JsonForms = pgTable("jsonForms", {
    id: uuid("id").defaultRandom().primaryKey(),
    formData: text("form_data").notNull(),
    theme: themeEnum("theme").notNull().default("light"),
    formBackground: varchar("form_background").default("bg-white"),
    borderStyle: varchar("border_style").default("border border-gray-300"),
    createdBy: varchar("created_by", { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
