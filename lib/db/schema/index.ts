import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const commentTable = pgTable('comment', {
	id: uuid('id').primaryKey().defaultRandom(),
    feedback: text().notNull(),
    pageId: varchar("page_id").notNull(),
	createAt: timestamp('create_at', { mode: 'date' }).defaultNow(),
	updateAt: timestamp('update_at', { mode: 'date' }).defaultNow(),
});