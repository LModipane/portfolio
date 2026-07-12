'use client';

import { Role } from '@/types';
import { Brain, Cloud, Code2, FileText, FileUser } from 'lucide-react';

type Props = {
	url: string;
	name: string;
	description: string;
	type: keyof typeof fileIconRecode;
};

const iconClass =
	'flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105';

const fileIconRecode: Record<Role | 'default', React.ReactNode> = {
	general: (
		<div className={`${iconClass} bg-red-100`}>
			<FileUser size={4} stroke="#fb2c36" />
		</div>
	),
	data_science: (
		<div className={`${iconClass} bg-violet-100`}>
			<Brain size={4} stroke="#7f22fe" />
		</div>
	),
	cloud_engineer: (
		<div className={`${iconClass} bg-amber-100`}>
			<Cloud size={4} stroke="#D97706" />
		</div>
	),
	software_developer: (
		<div className={`${iconClass} bg-emerald-100`}>
			<Code2 size={4} stroke="#059669" />
		</div>
	),
	default: (
		<div className={`${iconClass} bg-slate-100`}>
			<FileText className="h-4 w-4 text-slate-600" />
		</div>
	),
};

const DownloadResume = ({ name, url, description, type }: Props) => {
	const download = () => {
		if (!url) return;

		// Append Sanity's forced download CDN parameter
		const secureDownloadUrl = `${url}?dl=${encodeURIComponent(name)}`;

		// Create a temporary element to safely trigger the download action
		const hiddenLink = document.createElement('a');
		hiddenLink.href = secureDownloadUrl;
		hiddenLink.target = '_self'; // Prevents opening unnecessary white browser tabs

		document.body.appendChild(hiddenLink);
		hiddenLink.click();
		document.body.removeChild(hiddenLink);
	};

	const Icon = fileIconRecode[type] || fileIconRecode.default;

	return (
		<div
			onClick={download}
			className=" flex w-full cursor-pointer items-start gap-4 rounded-2xl border border-transparent p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm active:scale-[0.99]">
			{Icon}

			<div className="min-w-0 flex-1">
				<p className="text-sm font-semibold text-slate-900 md:text-base capitalize">{name}</p>
				<p className="text-slate-500! mt-1 text-xs leading-relaxed md:text-xs">{description}</p>
			</div>
		</div>
	);
};

export default DownloadResume;
