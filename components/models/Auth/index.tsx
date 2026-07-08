'use client';

import { useModel } from '@/hooks';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { MessageSquare, ShieldCheck, Mail } from 'lucide-react';

import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogContent,
	DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const AuthModel = () => {
	const { status } = useSession();
	const { type, isOpen } = useModel();

	const isModelOpen = status !== 'authenticated' && type === 'AUTH' && isOpen;

	return (
		<Dialog open={isModelOpen}>
			<DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl">
				<DialogHeader className="space-y-3 text-center">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
						<MessageSquare className="h-7 w-7 text-blue-600" />
					</div>

					<DialogTitle className="text-2xl font-bold">Leave a Comment</DialogTitle>

					<DialogDescription className="text-base leading-relaxed">
						To keep discussions genuine and reduce spam, we ask you to sign in before posting a
						comment.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<ScrollArea className='h-60 space-y-4'>
						<div className="rounded-xl border bg-slate-50 p-4 text-sm text-slate-600 mb-2">
							<div className="flex gap-3">
								<ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

								<div className="space-y-2">
									<p className="font-medium text-slate-900">Your privacy matters</p>

									<ul className="space-y-1 text-sm">
										<li>• Your email is only used to verify you&apos;re a real person.</li>
										<li>• You can choose to post your comment anonymously.</li>
										<li>• Anonymous comments won&apos;t display your name or email.</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="space-y-3">
							<Button
								onClick={() => signIn('google')}
								className="h-12 w-full gap-3 rounded-xl bg-white text-slate-900 border hover:bg-slate-50"
								variant="outline">
								{/* <Chrome className="h-5 w-5" /> */}
								Continue with Google
							</Button>

							<Button
								onClick={() => signIn('yahoo')}
								className="h-12 w-full gap-3 rounded-xl bg-[#6001D2] text-white hover:bg-[#4E00AC]">
								<Mail className="h-5 w-5" />
								Continue with Yahoo
							</Button>
						</div>
					</ScrollArea>

					<p className="text-center text-xs text-slate-500 leading-relaxed">
						By continuing, you agree to authenticate your identity for commenting. Your email
						address will never be displayed publicly.
					</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModel;
