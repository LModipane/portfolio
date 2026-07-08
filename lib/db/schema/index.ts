import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const profileTable = pgTable('profile', {
	id: uuid('id').primaryKey().defaultRandom(),
	imageUrl: varchar('image_url'),
	name: varchar('name').notNull(),
	email: varchar('email').notNull(),
	userId: varchar('user_id').notNull(),
	createdAt: timestamp('create_at', { mode: 'date' }).defaultNow(),
	updateAt: timestamp('update_at', { mode: 'date' }).defaultNow(),
});

export const profileRelation = relations(profileTable, ({ many }) => ({
	comments: many(commentTable),
}));

export const commentTable = pgTable('comment', {
	id: uuid('id').primaryKey().defaultRandom(),
	profileId: uuid('profile_id')
		.notNull()
		.references(() => profileTable.id),
	feedback: text().notNull(),
	avatarUrl: varchar('avatar_url'),
	pageId: varchar('page_id').notNull(),
	authorName: varchar('author_name').notNull(),
	authorEmail: varchar('author_email').notNull(),
	createdAt: timestamp('create_at', { mode: 'date' }).defaultNow(),
	updateAt: timestamp('update_at', { mode: 'date' }).defaultNow(),
});

export const commentRelation = relations(commentTable, ({ one }) => ({
	profile: one(profileTable, { fields: [commentTable.profileId], references: [profileTable.id] }),
}));
