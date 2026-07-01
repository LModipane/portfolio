import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Titles } from '@/components/index';
import gitHubLogo from '../public/github.svg';
import linkinlogo from '../public/linkedin.svg';
import { client as SanityClient } from '@/sanity/lib/client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

import {
	Mail,
	Clock,
	MapPin,
	Sparkles,
	Download,
	Newspaper,
	FileCode2,
	FileBraces,
	FolderKanban,
	CalendarFold,
	ExternalLink,
	GraduationCap,
} from 'lucide-react';

type Hero = {
	myName: string;
	myRoles: string[];
};

type Project = {
	_id: string;
	title: string;
	logoUrl: string;
	linkLive: string;
	linkGitHub: string;
	description: string;
	backgroundImageUrl: string;
	tools: { _id: string; title: string }[];
};

type Skill = {
	_id: string;
	title: string;
	iconUrl: string;
	description: string;
};

type Blog = {
	_id: string;
	headline: string;
	publishedAt: string;
	description: string;
	imageCardUrl: string;
};

type LocationModel = 'in-office' | 'hybrid' | 'remote';

type Career = {
	_id: string;
	role: string;
	startDate: string;
	description: string;
	locationType: LocationModel;
	endDate: string | undefined;
	tools: { _id: string; title: string }[];
	organisation: { name: string; logoUrl: string; location: string; link: string };
};

export const dynamic = 'force-dynamic';

export default async function Home() {
	const querys = {
		// Here is where i query for my hero section
		hero: `*[_type == "heroSection"][0]{
					myName,
					myRoles
				},`,

		// here I query for projects sections
		projects: `*[_type == "projects"]{
					"_id": slug.current,
					title,
					"logoUrl": logo.asset->url,
					liveLink,
					githubLink,
					description,
					"_id": slug.current,
					"backgroundImageUrl": backgroundImage.asset->url,
					"tools": technologies[]->{
							"_id": slug.current,
							title
						},
				},`,

		// here are query for my skills section
		skills: `*[_type == "skills"]{
					title,
					description,
					"_id": slug.current,
					"iconUrl": icon.asset->url
				},`,

		// here is query for by blog section
		blogs: `*[_type == "blogs"]{
					headline,
					description,
					publishedAt,
					"_id": slug.current,
					"imageCardUrl": image.asset->url
				},`,

		// here is query for career section:
		career: `*[_type == "career"] | order(startDate desc){
					role,
					locationType,
					startDate,
					endDate,
					description,
					"_id": slug.current,
					"tools": technologies[]->{
						"_id": slug.current,
						title
					},
					"organisation": {
						"name": organisation,
						"logoUrl": organisationLogo.asset->url,
						"location": officeLocation,
						"link": organisationLink
					},
				},`,
	};

	const query = `{
				"hero": ${querys.hero}
				"blogs": ${querys.blogs}
				"skills": ${querys.skills}
				"career": ${querys.career}
				"projects": ${querys.projects}
				}`;

	const {
		blogs,
		skills,
		career,
		projects,
		hero: { myName, myRoles },
	} = await SanityClient.fetch<{
		hero: Hero;
		blogs: Blog[];
		skills: Skill[];
		career: Career[];
		projects: Project[];
	}>(query);

	return (
		<main className="h-full w-full text-black overflow-y-scroll">
			{/* Hero section */}
			<header className="min-h-full w-full flex items-center justify-center bg-gray-100">
				<div className="flex flex-col items-center bg-white/80 border-2 border-gray-300/40 rounded-lg py-8 shadow-lg max-w-[98%]">
					{/* Availability Tag */}
					<div className="rounded-full p-0.5 bg-linear-to-r from-blue-500 to-purple-600 mb-2 animate-gradient lowercase animate-pulse duration-300">
						<div className="bg-gray-100 rounded-full p-2">
							<div className="flex items-center text-md font-extralight border-2 rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text animate-gradient">
								<Sparkles className="mr-3 text-blue-500" size={18} />
								I&apos;m Available, just one click away
							</div>
						</div>
					</div>

					{/* Call to Action */}
					<div className=" flex flex-col justify-center mx-auto px-4 py-8 w-full">
						<h1 className="text-5xl font-semibold item-end text-slate-900">
							{myName} <Titles roles={myRoles} />
						</h1>
						<h2 className="text-3xl font-extralight mt-6 mx-auto text-gray-600/80 text-center max-w-[80%]">
							Looking to contribute Software, Cloud, & Data expertise to your next project,
							let&apos;s schedule a{' '}
							<span className="bg-linear-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text underline underline-offset-4 animate-gradient">
								conversation and START BUILDING!!!
							</span>
						</h2>
					</div>

					{/* Call to Action Buttons */}
					<div className="flex justify-center mt-2 items-center">
						<button className="flex px-6 py-3 bg-slate-900 text-white rounded-3xl hover:bg-linear-to-r hover:from-blue-500 hover:to-purple-600 hover:scale-110 transition-colors duration-100 cursor-pointer">
							Let&apos;s Connect <Mail className="ml-2" size={20} />
						</button>
						<div className="ml-8 flex group justify-center items-center rounded-3xl bg-slate-800 hover:bg-linear-to-r hover:from-blue-500 hover:to-purple-600 p-0.5 cursor-pointer transition-all duration-150 hover:scale-110">
							<div className="bg-white rounded-[calc(1.5rem-2px)] px-6 py-3">
								<button className="flex items-center text-slate-900 bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text  transition-all duration-100 cursor-pointer">
									<span className="group-hover:text-transparent">Download Resume</span>
									<Download className="ml-2 group-hover:text-purple-600" size={20} />
								</button>
							</div>
						</div>
					</div>

					{/* Social Links */}
					<div className="flex justify-center mt-8 space-x-4 text-slate-800">
						<a
							href="https://linkedin.com/in/shaunlesedi"
							target="_blank"
							rel="noopener noreferrer"
							className=" hover:text-blue-500 transition-colors duration-300 flex flex-col items-center">
							<Image src={linkinlogo} alt="Logo" width={35} height={35} /> LinkedIn
						</a>
						<a
							href="https://github.com/shaunlesedi"
							target="_blank"
							rel="noopener noreferrer"
							className=" hover:text-gray-500 transition-colors duration-300 flex flex-col items-center">
							<Image src={gitHubLogo} alt="Logo" width={35} height={35} /> GitHub
						</a>
					</div>
				</div>
			</header>
			{/* About me Section */}
			<section className="min-h-full w-full flex justify-center bg-white">
				<div className="flex flex-col items-center p-8 shadow-lg mt-10 mb-5 w-full max-w-[90%]">
					<h2 className="text-3xl font-semibold mb-4">About Me</h2>
					<hr className="border-2 border-blue-500 w-full " />
					<div className="mt-6">
						<div className="text-2xl font-light text-gray-700/90 mx-auto text-center max-w-[88%]">
							<p>
								I am Lesedi Shaun Modipane, a Bachelor of Science Information System graduate, based
								in Tshwane Pretoria South Africa. I specialise in software engineering with a strong
								focus on building practical, data-drive applications that solve real-world problems.
								A key part of my motivation is my passion for developing software that improves
								township life and empowers local businesses by making digital tools more accessible,
								useful, and impactful in everyday community settings.
								<br className="min-h-10" />
								My work spans web development, AI systems, and cloud-based architectures, with a
								growing interest in applying machine learning to prediction systems and decision
								support tools. I value clarity in design, efficiency in execution, and continuous
								learning, especially in fast-evolving technical fields like AI and distributed
								systems. I enjoy translating complex technical ideas into usable products, with a
								strong emphasis on reliability, scalability, and user experience. My core strengths
								lie in JavaScript/TypeScript development, modern web frameworks, and building
								systems that combine data and intelligence to generate meaningful outcomes.
							</p>
							<br />
							<p className="text-start">
								Want to understand how I think and build? Take a look at my{' '}
								<span className="text-purple-700 cursor-pointer underline decoration-dotted hover:text-blue-500">
									<a href="#Projects">Projects</a>
								</span>
								,{' '}
								<span className="text-purple-700 cursor-pointer underline decoration-dotted hover:text-blue-500">
									<a href="#Blogs">Blog</a>
								</span>
								, or{' '}
								<span className="text-purple-700 cursor-pointer underline decoration-dotted hover:text-blue-500">
									<a href="#Career">Career Journey</a>
								</span>{' '}
								where I break down my work, ideas, and carrer in more detail.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* Projects Section */}
			<section id="Projects" className="h-fit min-h-full w-full flex justify-center bg-gray-100">
				<div className="flex flex-col p-8 shadow-lg mt-10 mb-5 h-fit w-full max-w-[90%] bg-white">
					<h2 className="flex gap-x-2 text-3xl font-semibold mb-4 flex-end ">
						<FolderKanban size={35} />
						My Projects
					</h2>
					<hr className="h-2 border-0 bg-linear-to-r from-blue-500 to-purple-500" />
					<div className="mt-6 flex justify-center flex-wrap  gap-4 w-full">
						{projects.map(obj => (
							<ProjectCard key={obj._id} {...obj} />
						))}
					</div>
				</div>
			</section>
			{/* Skills Section */}
			<section id="skills" className="h-fit min-h-full w-full flex justify-center bg-gray-100">
				<div className="flex flex-col p-8 shadow-lg mt-10 mb-5 min-h-full w-full max-w-[90%] bg-white">
					<h2 className="flex gap-x-2 text-3xl font-semibold mb-4 flex-end ">
						<FileCode2 size={35} />
						My Skills
					</h2>
					<hr className="h-2 border-0 bg-linear-to-r from-blue-500 to-purple-500" />
					<div className="mt-6 flex flex-wrap gap-2">
						{skills.map(obj => (
							<SkillCard key={obj._id} {...obj} />
						))}
					</div>
				</div>
			</section>
			<section id="Blogs" className="h-fit min-h-full w-full flex justify-center bg-white">
				<div className="flex flex-col p-8 shadow-lg mt-10 mb-5 h-full w-full max-w-[90%] bg-white">
					<h2 className="flex gap-x-2 text-3xl font-semibold mb-4 flex-end ">
						<Newspaper size={35} />
						My Blog
					</h2>
					<hr className="h-2 border-0 bg-linear-to-r from-blue-500 to-purple-500" />
					{/* <p className="text-md font-light text-gray-700/90 text-start max-w-[88%]">
						I write about my learning journey, projects, and ideas in software development, cloud
						computing, and AI on my blog. I share insights, tutorials, and reflections to help
						others learn and grow in their tech careers. Check back often for new posts where I
						break down complex topics into practical guides and share what I&apos;m learning along
						the way.
					</p> */}
					<div className="mt-6">
						{blogs.map(obj => (
							<BlogCard key={obj._id} {...obj} />
						))}
					</div>
				</div>
			</section>
			<section id="Career" className="h-fit min-h-full w-full flex justify-center bg-gray-100">
				<div className="flex flex-col p-8 shadow-lg mt-10 mb-5 h-full w-full max-w-[90%] bg-white">
					<h2 className="flex gap-x-2 text-3xl font-semibold mb-4 flex-end ">
						<Newspaper size={35} />
						Career Journey
					</h2>
					<hr className="h-2 border-0 bg-linear-to-r from-blue-500 to-purple-500" />
					<div className="mt-6 flex flex-col">
						{career.map((obj, index) => (
							<CareerCard key={obj._id} {...obj} index={index} />
						))}
					</div>
				</div>
			</section>
			<footer
				id="footer"
				className="h-full w-full flex flex-col items-center justify-center p-8 bg-black text-white">
				<h3>Let&apos;s Connect and build Something Great Together</h3>
				{/* Display Email and Phone Number */}
				<p className="text-gray-700/90 text-center">
					&copy; {new Date().getFullYear()} Shaun Lesedi Modipane. All rights reserved.
				</p>
			</footer>
		</main>
	);
}

const ProjectCard = ({
	_id,
	title,
	tools,
	logoUrl,
	linkLive,
	linkGitHub,
	description,
	backgroundImageUrl,
}: Project) => (
	<div className="group relative w-full max-w-[30%] min-w-65 rounded-2xl bg-linear-to-r from-blue-500 to-purple-600 p-0.5 hover:z-20 transition-all duration-300">
		<Link href={`/project/${_id}`} className="block h-full">
			<div className="relative h-full rounded-2xl bg-white overflow-hidden flex flex-col">
				{/* Image section */}
				<div className="relative h-40 w-full overflow-hidden">
					<Image
						src={backgroundImageUrl}
						alt={`${title} background`}
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className="object-cover group-hover:scale-105 transition-transform duration-500"
					/>
				</div>

				{/* Floating logo */}
				<div className="absolute left-4 top-28 h-20 w-20 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
					<Image src={logoUrl} alt={`${title} logo`} fill sizes="80px" className="object-cover" />
				</div>

				{/* Content */}
				<div className="pt-12 px-4 flex flex-col gap-3">
					<h3 className="text-xl font-bold text-slate-800 truncate">{title}</h3>

					<p className="text-sm text-slate-600 line-clamp-4">{description}</p>

					{/* Tools */}
					<div className="flex flex-wrap gap-2">
						{tools.map(obj => (
							<span
								key={obj._id}
								className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
								{obj.title}
							</span>
						))}
					</div>
				</div>

				{/* Footer */}
				<div className="mt-auto flex justify-end gap-3 p-4 text-sm text-slate-700">
					<a
						href={linkGitHub}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 hover:text-black transition">
						<FileBraces size={18} />
						Code
					</a>

					<a
						href={linkLive}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1 hover:text-black transition">
						<ExternalLink size={18} />
						Live
					</a>
				</div>
			</div>
		</Link>
	</div>
);

const SkillCard = ({ title, description, iconUrl }: Skill) => (
	<HoverCard>
		<HoverCardTrigger asChild>
			<div className="border-2 border-gray-500 rounded-2xl p-4 h-50 w-50 flex flex-col items-center justify-center">
				<div className="relative h-16 w-16">
					<Image src={iconUrl} alt={`${title} icon`} fill className="object-cover object-center" />
				</div>
				<h4 className="text-xl font-bold text-gray-800 mt-2">{title}</h4>
			</div>
		</HoverCardTrigger>
		<HoverCardContent
			align="start"
			side="right"
			sideOffset={-50}
			alignOffset={-20}
			className="w-64 bg-white border-2 border-gray-300 rounded-lg p-4 shadow-lg">
			<p>{description}</p>
		</HoverCardContent>
	</HoverCard>
);

const BlogCard = ({ _id, headline, imageCardUrl, description, publishedAt }: Blog) => (
	<div className="group w-full sm:w-[50%]">
		<Link href={`/blog/${_id}`}>
			<div className="h-full flex flex-col sm:flex-row rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
				{/* Image */}
				<div className="relative w-full sm:w-44 aspect-square overflow-hidden bg-slate-100">
					<Image
						src={imageCardUrl}
						alt={`blog ${_id} image`}
						fill
						sizes="(max-width: 640px) 100vw, 176px"
						className="object-cover group-hover:scale-105 transition-transform duration-500"
					/>
				</div>

				{/* Content */}
				<div className="flex flex-col flex-1 p-4 gap-3">
					{/* Meta */}
					<div className="flex items-center gap-2 text-xs text-slate-500">
						<Clock size={14} />
						<span>{blogDate(publishedAt)}</span>
					</div>

					{/* Title */}
					<h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug line-clamp-2">
						{headline}
					</h3>

					{/* Description */}
					<p className="text-sm text-slate-600 line-clamp-2">{description}</p>

					{/* Footer */}
					<div className="mt-auto flex flex-wrap gap-2 pt-2">
						<span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
							Read time: 6 min
						</span>

						<span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
							✨ 6
						</span>
					</div>
				</div>
			</div>
		</Link>
	</div>
);

function blogDate(dateString: string): string {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short', // 'Dec'
		hour: '2-digit',
		year: 'numeric',
		minute: '2-digit',
		hourCycle: 'h12', // Ensure 24-hour format
		timeZone: 'Africa/Johannesburg',
	};
	return new Intl.DateTimeFormat('en-GB', options).format(date);
}

const CareerCard = ({
	role,
	tools,
	index,
	endDate,
	startDate,
	description,
	locationType,
	organisation: { name, location, link, logoUrl },
}: Career & { index: number }) => (
	<div className={cn('relative flex w-full h-fit', index % 2 === 0 ? 'flex-row-reverse' : '')}>
		<div
			className={cn(
				'absolute top-0 z-10 min-w-[50%] -ml-0.75 min-h-full border-gray-500',
				index % 2 === 0 ? 'border-l-4 left-[50%]' : 'border-r-4 right-[50%]',
			)}
		/>
		<div className={cn('absolute top-[15%] right-[50%] -mr-2 w-5 h-5 bg-gray-500 rounded-full')} />
		<div
			className={cn(
				'w-100 h-112.5 z-20 flex flex-end flex-col hover:border-0 border-2 border-slate-600 rounded-lg shadow-xl text-slate-600 bg-white hover:scale-105 overflow-hidden',
				index % 2 === 0 ? 'mr-auto' : 'ml-auto',
			)}>
			<div className="bg-gray-200 min-h-full w-full hover:p-0.75 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 animate-gradient overflow-hidden group/card">
				<div className="group/card relative w-full h-full border border-slate-200 bg-white backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-5">
					{/* Header */}
					<div className="flex items-start justify-between gap-4">
						<div className="flex flex-col">
							<h3 className="text-xl font-semibold text-slate-900 leading-tight">{role}</h3>

							<Link
								href={link}
								className="mt-1 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 group/link transition">
								<div className="relative w-5 h-5 rounded-full overflow-hidden ring-1 ring-slate-200">
									<Image src={logoUrl} alt={`${name} logo`} fill className="object-cover" />
								</div>

								<span className="font-medium">{name}</span>

								<ExternalLink
									size={14}
									className="opacity-0 group-hover/link:opacity-100 transition"
								/>
							</Link>
						</div>

						{/* Icon badge */}
						<div className="shrink-0">
							<div className="p-2.5 rounded-xl bg-linear-to-tr from-blue-500 to-violet-600 text-white shadow-sm group-hover/card:scale-105 transition-transform">
								<GraduationCap size={22} />
							</div>
						</div>
					</div>

					{/* Meta */}
					<div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
						<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100">
							<CalendarFold size={14} />
							<span>
								{careerData(startDate)} — {endDate ? careerData(endDate) : 'Present'}
							</span>
						</div>

						<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100">
							<MapPin size={14} />
							<span>{locationType === 'in-office' ? location : locationType}</span>
						</div>
					</div>

					{/* Description */}
					<p className="mt-4 text-sm leading-relaxed text-slate-700">{description}</p>

					{/* Tools */}
					<div className="mt-4 flex flex-wrap gap-2">
						{tools.map(obj => (
							<span
								key={obj._id}
								className="text-xs px-2.5 py-1 rounded-full bg-slate-900/5 text-slate-700 border border-slate-200 hover:bg-slate-900/10 transition">
								{obj.title}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	</div>
);

export function careerData(dateString: string): string {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		month: 'short', // 'Dec'
		year: 'numeric',
		day: '2-digit',
		timeZone: 'Africa/Johannesburg',
	};
	return new Intl.DateTimeFormat('en-GB', options).format(date);
}
