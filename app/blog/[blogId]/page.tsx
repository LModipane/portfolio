import { CommentsSection, MarkdownSection } from '@/components/index';

export default async function Home({
	params,
	searchParams,
}: {
	params: Promise<{ blogId: string }>;
	searchParams: Promise<{
		comment?: string;
	}>;
}) {
	const { blogId } = await params;
	const { comment } = await searchParams;
	return (
		<main className="h-full w-full flex flex-col text-slate-800 bg-white overflow-x-hidden">
			{/* Add Header section */}
			{/* Body: */}
			<MarkdownSection content={null} />
			{/* Comments */}
			<CommentsSection pageId={`blog:${blogId}`} formStatus={comment} />
			{/* footer */}
			<footer className="h-full text-white bg-black mt-auto p-2 flex items-center justify-center">
				footer
			</footer>
		</main>
	);
}
