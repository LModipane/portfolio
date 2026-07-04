'use client';

import { Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';

const Text = () => {
	const { pending } = useFormStatus();
	return pending ? (
		<span className='flex gap-3'>
			{'Sending...'} <Loader size={20} className="animate-spin" />{' '}
		</span>
	) : (
		'Send Feedback'
	);
};

export default Text;
