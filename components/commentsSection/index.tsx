import Text from './text';
import Link from 'next/link';
import FeedbackTextarea from './feedbackTextArea';
import { create_comment } from '@/actions/create_comment';

type Props = {
	pageId: string;
	comment: string | undefined;
};

function CommentsSection({ pageId, comment }: Props) {
	const feedbackSuccess = comment === 'success';

	return (
		<section className="w-full max-w-[70%] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
			<FeedbackError comment={comment} />

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
					action={create_comment.bind(null, pageId)}
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
		</section>
	);
}

export default CommentsSection;

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
