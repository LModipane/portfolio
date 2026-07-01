'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

import React from 'react';

const CopyButton = ({ raw }: { raw: string }) => {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		await navigator.clipboard.writeText(raw);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};
	return (
		<button
			onClick={copy}
			className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
			{copied ? <Check size={14} /> : <Copy size={14} />}
			{copied ? 'Copied' : 'Copy'}
		</button>
	);
};

export default CopyButton;
