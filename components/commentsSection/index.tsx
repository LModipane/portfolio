import FeedbackTextarea from './feedbackTextArea';
import { create_comment } from '@/actions/create_comment';

type Props = {
	pageId: string
}

function CommentsSection({ pageId}:Props) {
	return (
		<section className="w-full max-w-[70%] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div className="mb-5">
				<span className="mb-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
					Let&apos;s Connect
				</span>

				<h4 className="text-2xl font-bold tracking-tight text-slate-900 capitalize">
					Tell Me what you think
				</h4>

				<p className="mt-2 text-sm leading-6 text-slate-500">
					If you&apos;re a developer with ideas to share, a hiring manager evaluating my work, or a
					reader with questions or feedback, I&apos;d be glad to hear from you. Every message is
					appreciated and helps create meaningful conversations around the project.
				</p>
			</div>
			<form
				action={create_comment.bind(null, pageId)}
				className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
				<FeedbackTextarea />

				<div className="mt-5 flex justify-end">
					<button
						type="submit"
						className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
						Send Feedback
					</button>
				</div>
			</form>
		</section>
	);
}

export default CommentsSection;
