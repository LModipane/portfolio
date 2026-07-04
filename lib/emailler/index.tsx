import nodeEmailler, { TransportOptions } from 'nodemailer';

if (
	!process.env.EMAILLER_USER ||
	!process.env.EMAILLER_PASS ||
	!process.env.EMAILLER_HOST ||
	!process.env.EMAILLER_PORT
)
	throw new Error('ERROR:Missing ENV For Emailler Client!!!');

export const emailler = nodeEmailler.createTransport({
	host: process.env.EMAILLER_HOST,
	port: process.env.EMAILLER_PORT ? Number(process.env.EMAILLER_PORT) : undefined,
	auth: {
		user: process.env.EMAILLER_USER,
		pass: process.env.EMAILLER_PASS,
	},
} as TransportOptions);
