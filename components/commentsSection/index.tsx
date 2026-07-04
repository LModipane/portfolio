import FeedbackTextarea from './feedbackTextArea';

function CommentsSection() {
	return (
		<section className="w-full max-w-[70%] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div className="mb-5">
				<span className="mb-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
					Feedback
				</span>

				<h4 className="text-2xl font-bold tracking-tight text-slate-900">Tell me what you think</h4>

				<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
					I&apos;d love to hear your thoughts, suggestions, or anything that could help improve your
					experience.
				</p>
			</div>

			<form
				action={undefined}
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
