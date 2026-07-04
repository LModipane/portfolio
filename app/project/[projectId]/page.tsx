import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { CommentsSection, MarkdownSection, TooLongToRead } from '@/components/index';

type Project = {
	title: string;
	iconUrl: string;
	content: string;
	description: string;
	coverImageUrl: string;
};

export default async function Home({
	params,
	searchParams,
}: {
	params: Promise<{ projectId: string }>;
	searchParams: Promise<{
		comment?: string;
	}>;
}) {
	const { projectId } = await params;
	const { comment } = await searchParams;
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
		<main className="h-full w-full flex flex-col items-center text-slate-800 bg-white overflow-x-hidden">
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
			<MarkdownSection content={content} />
			{/* Comments */}
			<CommentsSection pageId={`project:${projectId}`} comment={comment} />
			{/* footer */}
			<footer className="h-full w-full text-white bg-black mt-auto p-2 flex items-center justify-center">
				footer
			</footer>
		</main>
	);
}
