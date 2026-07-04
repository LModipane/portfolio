import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const commentTable = pgTable('comment', {
	id: uuid('id').primaryKey().defaultRandom(),
	feedback: text().notNull(),
	avatarUrl: varchar('avatar_url'),
	pageId: varchar('page_id').notNull(),
	authorName: varchar('author_name').notNull(),
	authorEmail: varchar('author_email').notNull(),
	createdAt: timestamp('create_at', { mode: 'date' }).defaultNow(),
	updateAt: timestamp('update_at', { mode: 'date' }).defaultNow(),
});
