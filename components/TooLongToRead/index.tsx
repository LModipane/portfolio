'use client';

import {useState} from "react"

type Props = {
	description: string;
	maxWords?: number;
};

const TooLongToRead = ({ description, maxWords = 35 }: Props) => {
	const [isExpanded, setIsExpanded] = useState(false);

	// Split the string into an array of words
	const words = description.split(' ');
	const isLongText = words.length > maxWords;

	// Render text based on expansion state
	const renderedText =
		isExpanded || !isLongText ? description : words.slice(0, maxWords).join(' ') + '... ';
	return (
        <div className="absolute top-34 left-0">
            <h3>TLDR</h3>
			<p style={{ display: 'inline' }}>{renderedText}</p>
			{isLongText && (
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					style={{
						background: 'none',
						border: 'none',
						color: 'blue',
						cursor: 'pointer',
						padding: 0,
					}}>
					{isExpanded ? 'Read Less' : 'Read More'}
				</button>
			)}
		</div>
	);
};

export default TooLongToRead;
