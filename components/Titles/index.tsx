'use client';
import { Typewriter } from 'react-simple-typewriter';

type Props = {
	roles: string[];
};

const Titles = ({ roles }: Props) => {
	return (
		<span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-lg lg:text-7xl md:text-6xl font-medium shadow-sm">
			<span className=" min-h-[1.3ch] bg-linear-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text whitespace-nowrap">
				<Typewriter
					loop={0}
					words={roles}
					cursorBlinking={true}
					typeSpeed={70}
					deleteSpeed={20}
					delaySpeed={1200}
				/>
			</span>
			<span className="ml-1 text-purple-500 animate-[blink-fast_0.6s_steps(1)_infinite]"> ✍🏿</span>
		</span>
	);
};

export default Titles;
