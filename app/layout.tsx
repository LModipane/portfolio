import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { AuthModel } from '@/components/models';
import AuthProvider from '@/components/AuthProvider';
import { authOptions } from '@/lib/nextAuth/options';
import { Geist, Geist_Mono, Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Lesedi Shaun Modipane Portfolio',
	description:
		'Welcome to my digital repository. A curated database of my professional journey, blogs, and projects timeline. This space serves as a transparent look into my thinking process and current projects, designed for those who want to explore my work and follow my progress in real-time.',
	icons: {
		icon: '/person.svg',
		apple: '/person.svg',
		other: {
			rel: 'icon',
			url: '/person.svg',
		},
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);
	
	return (
		<AuthProvider session={session}>
			<html
				lang="en"
				className={cn(
					'h-full',
					'antialiased',
					geistSans.variable,
					geistMono.variable,
					'font-sans',
					inter.variable,
				)}>
				<body className="h-screen w-screen">
					{children}
					<ModelProvider />
				</body>
			</html>
		</AuthProvider>
	);
}

function ModelProvider() {
	return (
		<>
			<AuthModel />
		</>
	);
}
