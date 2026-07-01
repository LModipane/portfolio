import Image from 'next/image';
import { codeToHtml } from 'shiki';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { client } from '@/sanity/lib/client';
import { CopyButton, TooLongToRead } from '@/components/index';

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
				<div className="w-full mx-auto max-w-[60%] prose lg:prose-xl">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={{
							h1: ({ ...props }) => (
								<h1
									className="scroll-m-20 mt-12 mb-6 text-4xl font-bold tracking-tight leading-tight lg:text-5xl"
									{...props}
								/>
							),
							h2: ({ ...props }) => (
								<h2
									className="scroll-m-20 mt-10 mb-5 border-b pb-2 text-3xl font-bold tracking-tight first:mt-0"
									{...props}
								/>
							),
							h3: ({ ...props }) => (
								<h3
									className="scroll-m-20 mt-8 mb-4 text-2xl font-semibold tracking-tight"
									{...props}
								/>
							),
							h4: ({ ...props }) => (
								<h4
									className="scroll-m-20 mt-6 mb-3 text-xl font-semibold tracking-tighter"
									{...props}
								/>
							),
							p: ({ ...props }) => (
								<p
									className="my-4 text-base leading-7 text-foreground  [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm  first:mt-0 last:mb-0"
									{...props}
								/>
							),
							ul: ({ ...props }) => <ul className="list-disc list-inside mt-2" {...props} />,
							ol: ({ ...props }) => (
								<ol
									className="my-4 ml-6 list-decimal space-y-2 marker:font-semibold marker:text-primary [&_ol]:mt-2 [&_ol]:ml-6 [&_ol]:space-y-1 [&_ol]:list-[lower-alpha] [&_ol_ol]:list-[lower-roman] [&_ul]:mt-2 [&_ul]:ml-6"
									{...props}
								/>
							),
							blockquote: ({ children, ...props }) => (
								<blockquote
									className="flex gap-3 my-6 rounded-r-lg border-l-4 border-primary/40 italic underline py-3 pl-5 pr-4  text-muted-foreground leading-7  [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:my-3 [&_ul]:my-3 [&_ol]:my-3 [&_pre]:my-4 [&_code]:bg-background [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5"
									{...props}>
									<Quote className="mt-1 h-5 w-5 shrink-0 text-primary/70" />
									<div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{children}</div>
								</blockquote>
							),
							input: ({ type, ...props }) => {
								if (type === 'checkbox') {
									return (
										<input
											type="checkbox"
											disabled
											className="mr-2 h-4 w-4 translate-y-1 rounded border-border text-primary focus:ring-2 focus:ring-primary/30"
											{...props}
										/>
									);
								}

								return <input type={type} {...props} />;
							},
							code: async ({ children, className }) => {
								const match = /language-(\w+)/.exec(className || '');
								const lang = match?.[1] ?? 'text';
								const html = await codeToHtml(String(children), {
									lang,
									theme: 'one-dark-pro',
								});
								return (
									<div className="my-6 overflow-hidden rounded-lg border border-border">
										{/* header */}
										<div className="flex items-center justify-between bg-muted/40 px-3 py-2 text-xs">
											<span className="text-muted-foreground">code.{lang}</span>
											<CopyButton raw={String(children)} />
										</div>

										{/* code */}
										<div dangerouslySetInnerHTML={{ __html: html }} />
									</div>
								);
							},
							img: ({ alt, title, src, width, height, ...props }) => {
								if (!src || Array.isArray(src)) {
									return null;
								}

								let imageSrc: string;

								if (typeof src === 'string') {
									imageSrc = src;
								} else if (src instanceof Blob) {
									imageSrc = URL.createObjectURL(src);
								} else {
									// Fallback to string coercion for other types
									imageSrc = String(src);
								}

								return (
									<figure className="my-8">
										<div className="relative w-full h-96">
											<Image
												fill
												src={imageSrc}
												alt={alt || title || 'Image'}
												className="mx-auto w-full max-w-full rounded-lg border border-border shadow-sm transition hover:shadow-md object-cover object-center"
												{...props}
											/>
										</div>
										{(title || alt) && (
											<figcaption className="mt-2 text-center text-sm text-muted-foreground">
												{title || alt}
											</figcaption>
										)}
									</figure>
								);
							},
						}}>
						{content}
					</ReactMarkdown>
				</div>
			</section>
			{/* Comments */}
			<section className="h-full w-full">
				<div className="w-full mx-auto max-w-[70%] mt-10">comment</div>
			</section>
			{/* footer */}
			<footer className="h-full text-white bg-black mt-auto p-2 flex items-center justify-center">
				footer
			</footer>
		</main>
	);
}
