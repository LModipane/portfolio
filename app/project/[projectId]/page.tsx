import Image from 'next/image';
import { TooLongToRead } from '@/components/index';
import { client } from '@/sanity/lib/client';

type Project = {
	title: string;
	iconUrl: string;
	description: string;
	coverImageUrl: string;
};

export default async function Home({ params }: { params: Promise<{ projectId: string }> }) {
	const { projectId } = await params;
	const projectQuery = `*[_type == "projects" && slug.current == $projectId][0]{
							"coverImageUrl": backgroundImage.asset -> url,
							"iconUrl": logo.asset -> url,
							title,description,
						}`;
	const { coverImageUrl, iconUrl, title, description } = await client.fetch<Project>(projectQuery, {
		projectId,
	});

	return (
		<main className="h-full w-full flex flex-col text-slate-800 bg-gray-50 overflow-x-hidden">
			<header className="w-full h-fit">
				<div className="relative w-full h-40">
					<Image
						src={coverImageUrl}
						fill
						alt={`${projectId} cover image`}
						className="object-center object-cover"
					/>
				</div>
				<div className="relative mx-auto w-full max-w-[60%] -mt-17">
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
			<section className="h-full w-full mt-10">
				<div className="w-full mx-auto max-w-[60%]">body</div>
			</section>
			{/* Comments */}
			<section className="h-full w-full">
				<div className="w-full mx-auto max-w-[60%]">comment</div>
			</section>
			{/* footer */}
			<footer className="h-full text-white bg-black mt-auto p-2 flex items-center justify-center">
				footer
			</footer>
		</main>
	);
}
