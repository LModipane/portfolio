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
				placeholder="I'd appreciate your suggestions, concerns, or perceptive on my work..."
				className="min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none focus:border-blue-500 placeholder:text-xs md:placeholder:text-base"
			/>

			<div className="mt-3 w-full flex justify-between md:text-sm text-[10px] text-slate-500 ">
				<span>{words} words</span>
				<span className='max-w-[70%]'>Your feedback helps me to improve, as a developer</span>
			</div>
		</>
	);
};

export default FeedbackTextarea;
