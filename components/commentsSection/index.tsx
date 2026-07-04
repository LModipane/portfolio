import Text from './text';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import FeedbackTextarea from './feedbackTextArea';
import { create_comment } from '@/actions/create_comment';
import { MoreHorizontal } from 'lucide-react';
import { Comment } from '@/type';

type Props = {
	pageId: string;
	formStatus: string | undefined;
};

async function CommentsSection({ pageId, formStatus }: Props) {
	const feedbackSuccess = formStatus === 'success';
	const comments: Comment[] = await db.query.commentTable.findMany({
		where: (table, { eq }) => eq(table.pageId, pageId),
	});

	return (
		<section className="w-full max-w-[70%] my-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			{/* Section Header */}
			<div className="mb-5">
				<span className="mb-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
					Let&apos;s Connect
				</span>

				<h4 className="text-2xl font-bold tracking-tight text-slate-900">Tell me what you think</h4>

				<p className="mt-2 text-sm leading-6 text-slate-500">
					If you&apos;re a developer with ideas to share, a hiring manager evaluating my work, or a
					reader with questions or feedback, I&apos;d be glad to hear from you. Every message is
					appreciated and helps create meaningful conversations around the project.
				</p>
			</div>
			{/* Success and errror Message */}
			<FeedbackError comment={formStatus} />

			{feedbackSuccess ? (
				<div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
						<svg
							className="h-7 w-7 text-green-600"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
						</svg>
					</div>

					<h5 className="mt-5 text-xl font-semibold text-slate-900">
						Thank you for your feedback!
					</h5>

					<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
						I appreciate you taking the time to share your thoughts. Whether it was feedback, a
						suggestion, a question, or a professional inquiry, your message has been received and
						I&apos;ll review it as soon as possible.
					</p>

					<p className="mt-6 text-sm font-medium text-slate-700">
						Continue exploring my{' '}
						<Link
							href="/#Projects"
							className="font-semibold text-blue-600 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-700 hover:decoration-blue-600">
							projects
						</Link>{' '}
						or read more on the{' '}
						<Link
							href="/#Blogs"
							className="font-semibold text-blue-600 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-700 hover:decoration-blue-600">
							blog
						</Link>
						.
					</p>
				</div>
			) : (
				// Section Forrm
				<form
					action={create_comment.bind(null, {
						pageId,
						authorName: 'Shaun',
						authorEmail: 'Shaun@email',
					})}
					className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<FeedbackTextarea />

					<div className="mt-5 flex justify-end">
						<button
							type="submit"
							className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
							<Text />
						</button>
					</div>
				</form>
			)}
			{/* Section comment */}
			<div className="mt-10 border-t border-slate-200 pt-8">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
							<span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
								{comments.length === 0 && 'Start'} Discussion
							</span>

							{comments.length !== 0 && (
								<span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-700 shadow-sm">
									{comments.length}
								</span>
							)}
						</div>

						<h5 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
							Community Comments
						</h5>

						<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
							Read what others have shared about this project. Questions, constructive feedback, and
							thoughtful discussions are always welcome.
						</p>
					</div>
				</div>

				<div className="mt-8 space-y-5">
					{comments.length === 0 && (
						<div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-12 text-center">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-violet-600 text-3xl">
								💬
							</div>

							<h6 className="mt-5 text-xl font-semibold text-slate-900">
								Be the first to start the conversation
							</h6>

							<p className="mt-3 max-w-lg text-sm leading-7 text-slate-600">
								No one has commented yet. Share your thoughts, ask a question, or offer some
								constructive feedback. Every great discussion starts with a single comment.
							</p>

							<p className="mt-5 rounded-full bg-amber-50 px-4 py-2 text-xs font-medium text-amber-700">
								✨ Rumour has it the first commenter gets a little extra luck in their career. No
								guarantees—but it&apos;s worth a shot.
							</p>
						</div>
					)}
					{comments.map(obj => (
						<CommentCard key={obj.id} {...obj} />
					))}
				</div>
			</div>
		</section>
	);
}

export default CommentsSection;

export function CommentCard({ authorName, authorEmail, feedback, createdAt, avatarUrl }: Comment) {
	return (
		<div className="group flex gap-4 bg-white p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-md">
			{/* Avatar */}
			<div className="shrink-0">
				{avatarUrl ? (
					<Image
						src={avatarUrl}
						alt={authorName}
						className="h-12 w-12 rounded-full border border-slate-200 object-cover"
					/>
				) : (
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-violet-600 text-base font-semibold text-white">
						{authorName.charAt(0).toUpperCase()}
					</div>
				)}
			</div>

			{/* Content */}
			<div className="min-w-0 flex-1">
				<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
					<h5 className="font-semibold text-slate-900">{authorName}</h5>

					<span className="text-sm text-slate-500">#{authorEmail}</span>

					<span className="text-xs text-slate-400">•</span>

					<time className="text-xs text-slate-400">{createdAt?.toDateString()}</time>
				</div>

				<p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">{feedback}</p>
			</div>

			{/* Menu */}
			<button
				type="button"
				className="rounded-lg p-2 text-slate-400 opacity-0 transition-all hover:bg-slate-100 hover:text-slate-700 group-hover:opacity-100"
				aria-label="Comment options">
				<MoreHorizontal className="h-5 w-5" />
			</button>
		</div>
	);
}

type FeedbackErrorProps = {
	comment?: string;
};

const FeedbackError = ({ comment }: FeedbackErrorProps) =>
	comment &&
	comment !== 'success' && (
		<div
			className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
			role="alert">
			<div className="mt-0.5 shrink-0">
				<svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
					<path
						fillRule="evenodd"
						d="M18 10A8 8 0 1110 2a8 8 0 018 8zm-8-4a1 1 0 00-1 1v4a1 1 0 102 0V7a1 1 0 00-1-1zm0 8a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 14z"
						clipRule="evenodd"
					/>
				</svg>
			</div>

			<div>
				<h5 className="text-sm font-semibold text-red-900">Unable to submit feedback</h5>

				<p className="mt-1 text-sm leading-6 text-red-700">{comment}</p>
			</div>
		</div>
	);
