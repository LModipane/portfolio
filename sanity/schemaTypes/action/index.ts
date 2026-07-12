import { Role } from '@/types';
import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'heroSection',
	title: 'Hero Section',
	type: 'document',
	fields: [
		defineField({
			name: 'myName',
			title: 'My Name',
			type: 'string',
			description: 'This refers to the name that will display on the hero section of website',
		}),
		defineField({
			name: 'myRoles',
			title: 'My Roles',
			type: 'array',
			of: [{ type: 'string' }],
		}),
		defineField({
			name: 'resumeList',
			title: 'My Resumes',
			type: 'array',
			of: [
				{
					type: 'file',
					title: 'Resume',
					fields: [
						{
							name: 'resumeName',
							type: 'string',
							title: 'Resume Name',
							description: 'Optional name used when downloaded (include extension like .pdf)',
						},
						{
							name: 'description',
							type: 'text',
							title: 'Resume Description',
							description:
								'Required description to inform visitor what Resume their are downloading',
						},
						{
							name: 'role',
							title: 'Resume Role',
							type: 'string',
							options: {
								list: [
									{ title: 'General Resume', value: 'general' },
									{ title: 'Data Science Resume', value: 'data_science' },
									{ title: 'Cloud Engineer Resume', value: 'cloud_engineer' },
									{ title: 'Software Developer Resume', value: 'software_developer' },
								] as { title: string; value: Role }[],
								layout: 'radio', // Optional: renders as a clean radio button list
							},
						},
					],
				},
			],
		}),
	],
});
