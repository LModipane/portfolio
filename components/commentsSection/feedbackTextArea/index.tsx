'use client';

import { useState } from 'react';

const FeedbackTextarea = () => {
	const [value, setValue] = useState('');

	const words = value.trim().split(/\s+/).filter(Boolean).length;

	return (
		<>
			<textarea
				name="feedback"
				value={value}
				onChange={e => setValue(e.target.value)}
				className="min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-blue-500"
			/>

			<div className="mt-3 flex justify-between text-xs text-slate-500">
				<span>{words} words</span>
				<span>Your feedback helps improve the platform.</span>
			</div>
		</>
	);
};

export default FeedbackTextarea;
