'use client';

import { useModel } from '@/hooks';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, ShieldCheck } from 'lucide-react';

import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogContent,
	DialogDescription,
} from '@/components/ui/dialog';

const AuthModel = () => {
	const { status } = useSession();
	const { type, isOpen, onClose } = useModel();

	const isModelOpen = status !== 'authenticated' && type === 'AUTH' && isOpen;

	return (
		<Dialog open={isModelOpen} onOpenChange={onClose}>
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
					<ScrollArea className="h-60 pr-2">
						<div className="space-y-4">
							<div className="rounded-xl border bg-slate-50 p-4">
								<div className="flex gap-3">
									<ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

									<div className="space-y-2 text-sm text-slate-600">
										<p className="font-semibold text-slate-900">Why do I need to sign in?</p>

										<ul className="space-y-1">
											<li>• Verify you&apos;re a real person.</li>
											<li>• Reduce spam and abusive comments.</li>
											<li>• Your email address is never shown publicly.</li>
											<li>• You can publish your comment anonymously.</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="h-px flex-1 bg-slate-200" />
								<span className="text-xs font-medium uppercase tracking-wide text-slate-400">
									Choose a email service
								</span>
								<div className="h-px flex-1 bg-slate-200" />
							</div>

							<div className="space-y-3">
								<Button
									onClick={() => signIn('google')}
									className="h-12 w-full justify-center gap-3 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100 hover:text-red-800">
									{/* <FcGoogle className="h-5 w-5" /> */}
									Sign in with Google
								</Button>

								<Button
									onClick={() => signIn('microsoft-entra-id')}
									className="h-12 w-full justify-center gap-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-800">
									{/* <SiMicrosoft className="h-5 w-5 text-[#0078D4]" /> */}
									Sign in with Microsoft Outlook
								</Button>

								<Button
									onClick={() => signIn('yahoo')}
									className="h-12 w-full justify-center gap-3 rounded-xl border border-purple-200 bg-purple-50 text-purple-700 hover:border-purple-300 hover:bg-purple-100 hover:text-purple-800">
									{/* <SiYahoo className="h-5 w-5" /> */}
									Sign in with Yahoo
								</Button>
							</div>
						</div>
					</ScrollArea>

					<div className="rounded-lg bg-slate-50 px-4 py-3">
						<p className="text-center text-xs leading-relaxed text-slate-500">
							Your email is used only for authentication. You remain in control of whether your name
							is displayed or your comment is published anonymously.
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AuthModel;
