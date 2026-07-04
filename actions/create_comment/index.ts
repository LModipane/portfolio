'use server';

import { db } from '@/lib/db';
import { commentTable } from '@/lib/db/schema';

export async function create_comment(pageId: string, data: FormData) {
	try {
		const feedback = data.get('feedback') as string;
		if (!feedback) return;

		await db.insert(commentTable).values({ feedback, pageId });
	} catch (error) {
		console.error('Failed to create comment', { error });
	}
}
