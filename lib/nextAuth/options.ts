import { db } from '@/lib/db';
import { AuthOptions } from 'next-auth';
import { profileTable } from '@/lib/db/schema';
import GoogleProvider from 'next-auth/providers/google';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
	throw new Error('Google OAuth environment variables are not set');

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async signIn({ user }) {
			console.log({ user });
			try {
				if (!user.email || !user.id || !user.name || !user.email) return false;

				const existingProfile = await db.query.profileTable.findFirst({
					where: (table, { eq, or }) => or(eq(table.userId, user.id), eq(table.email, user.email!)),
				});
				if (existingProfile) return true;

				await db.insert(profileTable).values({
					userId: user.id,
					name: user.name,
					email: user.email,
					imageUrl: user.image,
				});

				return true;
			} catch (error) {
				console.error('Failed to Sign In', { error });
				return false;
			}
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session }) {
			return session;
		},
	},
	jwt: {
		secret: process.env.NEXT_AUTH_SECRET,
	},
	secret: process.env.NEXT_AUTH_SECRET,
	logger: {
		error(code, error) {
			console.error(code, error);
		},
		warn(code) {
			console.warn(code);
		},
		debug(code) {
			console.debug(code);
		},
	},
};
