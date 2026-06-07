import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { client } from '@/sanity/lib/client';
import { TooLongToRead } from '@/components/index';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

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
			<section className="h-fit w-full mt-10">
				<div className="w-full mx-auto max-w-[70%] prose lg:prose-xl">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={{
							// Modern, large indigo headings
							h1: ({ children }) => (
								<h1 className="text-3xl font-extrabold text-indigo-600 mb-4 mt-6">{children}</h1>
							),
							h2: ({ children }) => (
								<h2 className="text-xl font-bold text-gray-800 mb-3 mt-5 border-b pb-1">
									{children}
								</h2>
							),
							h3: ({ children }) => (
								<h3 className="text-xl font-bold text-gray-800 mb-3 mt-5 border-b pb-1">
									{children}
								</h3>
							),
							// High-readability body text
							p: ({ children }) => (
								<p className="text-base text-slate-600 leading-relaxed mb-4">{children}</p>
							),
							// Stylised underline links with hover transitions
							a: ({ href, children }) => (
								<a
									href={href}
									className="text-indigo-500 font-medium underline underline-offset-4 hover:text-indigo-700 transition-colors"
									target="_blank"
									rel="noopener noreferrer">
									{children}
								</a>
							),
							// Bullet points with spacing
							li: ({ children }) => (
								<li className="list-disc list-inside text-gray-600 mb-1 ml-2">{children}</li>
							),
							// ===== TABLE SUPPORT =====

							table: ({ children }) => (
								<div className="my-6 overflow-x-auto rounded-md border">
									<Table>{children}</Table>
								</div>
							),

							thead: ({ children }) => <TableHeader>{children}</TableHeader>,

							tbody: ({ children }) => <TableBody>{children}</TableBody>,

							tr: ({ children }) => <TableRow>{children}</TableRow>,

							th: ({ children }) => <TableHead className="font-semibold bg-gray-300">{children}</TableHead>,

							td: ({ children }) => (
								<TableCell className="align-top whitespace-pre-line border-r last:border-r-0 capitalize">
									{children}
								</TableCell>
							),
							br: () => <br />,
							// code({ node, className, children, ...props }) {
							// 	// 1. Check if it's an inline code block by looking for a language class
							// 	const match = /language-(\w+)/.exec(className || '');
							// 	const isInline = !match;

							// 	// 2. If it has a language, render the full SyntaxHighlighter
							// 	if (!isInline) {
							// 		return (
							// 			<SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
							// 				{String(children).replace(/\n$/, '')}
							// 			</SyntaxHighlighter>
							// 		);
							// 	}

							// 	// 3. Otherwise, render clean inline code without passing invalid properties
							// 	return (
							// 		<code
							// 			className={`${className || ''} bg-gray-100 px-1.5 py-0.5 rounded text-sm`}
							// 			{...props}>
							// 			{children}
							// 		</code>
							// 	);
							// },
						}}>
						{content}
					</ReactMarkdown>
				</div>
			</section>
			{/* Comments */}
			<section className="h-full w-full">
				<div className="w-full mx-auto max-w-[60%] mt-10">comment</div>
			</section>
			{/* footer */}
			<footer className="h-full text-white bg-black mt-auto p-2 flex items-center justify-center">
				footer
			</footer>
		</main>
	);
}
