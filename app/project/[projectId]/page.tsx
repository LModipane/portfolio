import Image from 'next/image';
import { codeToHtml } from 'shiki';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { client } from '@/sanity/lib/client';
import { CommentsSection, CopyButton, MarkdownSection, TooLongToRead } from '@/components/index';

import {
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
} from '@/components/ui/table';
import { Quote } from 'lucide-react';

type Project = {
	title: string;
	iconUrl: string;
	content: string;
	description: string;
	coverImageUrl: string;
};

export default async function Home({ params }: { params: Promise<{ projectId: string }> }) {
	const { projectId } = await params;
	const projectQuery = `*[_type == "projects" && slug.current == $projectId][0]{
							"coverImageUrl": backgroundImage.asset -> url,
							"iconUrl": logo.asset -> url,
							title,description, content,
						}`;
	const { coverImageUrl, iconUrl, title, description, content } = await client.fetch<Project>(
		projectQuery,
		{
			projectId,
		},
	);
	
	console.log(content);

	return (
		<main className="h-full w-full flex flex-col text-slate-800 bg-white overflow-x-hidden">
			<header className="w-full h-fit">
				<div className="relative w-full h-40">
					<Image
						src={coverImageUrl}
						fill
						alt={`${projectId} cover image`}
						className="object-center object-cover"
					/>
				</div>
				<div className="relative mx-auto w-full max-w-[70%] -mt-17">
					<div className="relative w-34 h-34">
						<Image
							fill
							src={iconUrl}
							alt={`${projectId} icon image`}
							className="object-cover object-center rounded-full"
						/>
					</div>
					<div className="mt-4">
						<h1 className="text-4xl font-bold">{title}</h1>
					</div>
					<TooLongToRead description={description} />
				</div>
			</header>
			{/* Body: */}
			<MarkdownSection content={ content} />
			{/* Comments */}
			<CommentsSection/>
			{/* footer */}
			<footer className="h-full text-white bg-black mt-auto p-2 flex items-center justify-center">
				footer
			</footer>
		</main>
	);
}
