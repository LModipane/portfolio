'use client';

import { useState } from 'react';

const FeedbackTextarea = () => {
	const [value, setValue] = useState('');

	const words = value.trim().split(/\s+/).filter(Boolean).length;

	function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === 'Enter' && e.ctrlKey) {
			e.preventDefault();

			e.currentTarget.form?.requestSubmit();
		}
	}

	return (
		<>
			<textarea
				name="feedback"
				value={value}
				onKeyDown={onKeyDown}
				onChange={e => setValue(e.target.value)}
				placeholder="I'd appreciate your suggestion, concerns, or perceptive on my work..."
				className="min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-blue-500"
			/>

			<div className="mt-3 flex justify-between text-xs text-slate-500">
				<span>{words} words</span>
				<span>Your feedback helps to improve me, as a developer</span>
			</div>
		</>
	);
};

export default FeedbackTextarea;
