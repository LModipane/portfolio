'use server';

import { db } from '@/lib/db';
import { commentTable } from '@/lib/db/schema';
import { emailler } from '@/lib/emailler';

export async function create_comment(pageId: string, data: FormData) {
	try {
		const feedback = data.get('feedback') as string;
		if (!feedback) return;

		await db.insert(commentTable).values({ feedback, pageId });

		await emailler.sendMail({
			from: 'modipanesh@gmail.com',
			to: 'modipanesh@gmail.com',
			subject: `Someeone commented on ${pageId}`,
			html: `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Portforlio Comment</title>
                        </head>
                        <body>
                            <p>Message</p>
                        </body>
                    </html>`,
		});
	} catch (error) {
		console.error('Failed to create comment', { error });
	}
}
