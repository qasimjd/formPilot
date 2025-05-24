import { timestamp, pgTable, text, uuid, varchar, integer } from "drizzle-orm/pg-core";


export const JsonForms = pgTable("jsonForms", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    formData: text("form_data").notNull(),
    theme: varchar("theme").default("light").notNull(),
    formBackground: varchar("form_background").default("bg-white").notNull(),
    borderStyle: varchar("border_style").default("border border-gray-300").notNull(),
    responsesCount: integer("responses_count").default(0).notNull(),
    createdBy: varchar("created_by", { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});


export const FormResponses = pgTable("formResponses", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    formId: uuid("formId").references(() => JsonForms.id).notNull(),
    responseData: text("response_data").notNull(),
    submittedAt: timestamp('submitted_at', { withTimezone: true }).defaultNow().notNull(),
    submittedBy: varchar("submitted_by", { length: 255 }).notNull(),
});