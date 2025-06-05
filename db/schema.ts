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


export const Users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});


export const Subscriptions = pgTable("subscriptions", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    userId: uuid("user_id").references(() => Users.id).notNull(),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }).notNull(),
    stripePriceId: varchar("stripe_price_id", { length: 255 }),
    status: varchar("status", { length: 50 }).notNull(),
    currentPeriodStart: timestamp('current_period_start', { withTimezone: true }),
    currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
    cancelAtPeriodEnd: integer("cancel_at_period_end"), // 0 or 1
    canceledAt: timestamp('canceled_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

