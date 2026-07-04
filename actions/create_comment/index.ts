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
			to: process.env.EMAILLER_USER,
			html: genEmail(pageId, feedback),
			subject: `💬 New feedback on "${pageId}"`,
			from: '"Portfolio Website" <modipanesh@gmail.com>',
		});
	} catch (error) {
		console.error('Failed to create comment', { error });
		return;
	}
}

const genEmail = (pageId: string, feedback: string) => `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>New Portfolio Feedback</title>
                        </head>
                        <body style="margin:0;padding:32px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
                            <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;">

                                <h2 style="margin-top:0;color:#0f172a;">
                                    New Feedback Received
                                </h2>

                                <p style="font-size:15px;line-height:1.6;">
                                    A visitor has submitted feedback from your portfolio.
                                </p>

                                <table style="width:100%;border-collapse:collapse;margin:24px 0;">
                                    <tr>
                                        <td style="padding:8px 0;font-weight:bold;width:120px;">Page</td>
                                        <td>${pageId}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding:8px 0;font-weight:bold;">Submitted</td>
                                        <td>${new Date().toLocaleString('en-ZA')}</td>
                                    </tr>
                                </table>

                                <h3 style="margin-bottom:12px;color:#0f172a;">
                                    Feedback
                                </h3>

                                <div
                                    style="
                                        background:#f8fafc;
                                        border-left:4px solid #2563eb;
                                        padding:16px;
                                        border-radius:8px;
                                        white-space:pre-wrap;
                                        line-height:1.6;
                                    "
                                >
                                    ${feedback}
                                </div>

                                <p style="margin-top:32px;font-size:13px;color:#64748b;">
                                    This notification was generated automatically from your portfolio website.
                                </p>

                            </div>
                        </body>
                    </html>
                    `;
