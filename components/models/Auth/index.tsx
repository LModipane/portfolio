'use client';

import { useModel } from '@/hooks';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogFooter,
	DialogContent,
	DialogDescription,
} from '@/components/ui/dialog';

const AuthModel = () => {
	const { status } = useSession();
	const { type, isOpen } = useModel();

	const isModelOpen = status !== 'authenticated' && type === 'AUTH' && isOpen;

	return (
		<Dialog open={isModelOpen}>
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle> Sign Up </DialogTitle>
					<DialogDescription>
						Sign up to track your Family Football scores and more!
					</DialogDescription>
				</DialogHeader>
				<div className="h-20">
					<button
						onClick={() => signIn('google')}
						className="mt-4 w-full flex justify-center items-center gap-x-3 rounded-md bg-blue-600 px-4 py-3 text-white text-xl hover:bg-blue-700">
						Sign in with Google
					</button>
				</div>
				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModel;
