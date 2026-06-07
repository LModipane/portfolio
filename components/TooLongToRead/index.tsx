'use client';

import {useState} from "react"

type Props = {
	description: string;
	maxWords?: number;
};

const TooLongToRead = ({ description, maxWords = 55 }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);

	// Split the string into an array of words
	const words = description.split(' ');
	const isLongText = words.length > maxWords;

	// Render text based on expansion state
	const renderedText =
		isExpanded || !isLongText ? description : words.slice(0, maxWords).join(' ') + '... ';
	return (
		<div className="mt-2 max-w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-100/50 backdrop-blur-sm">
			{/* Header Badge */}
			<div className="mb-3 flex items-center gap-2">
				<span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
				<h3 className="text-sm font-bold tracking-wider text-indigo-600 uppercase">TLDR</h3>
			</div>

			{/* Body Content */}
			<p className="inline text-base leading-relaxed text-gray-600 font-medium">{renderedText}</p>

			{/* Interactive Toggle Button */}
			{isLongText && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="ml-2 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 cursor-pointer underline decoration-2 underline-offset-4">
					{isExpanded ? 'Read Less' : 'Read More'}
				</button>
			)}
		</div>
	);
};

export default TooLongToRead;
