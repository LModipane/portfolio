import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'projects',
	title: 'Projects Inventory',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Project Title',
			type: 'string',
			description: 'The name of the project',
		}),
		defineField({
			name: 'logo',
			title: 'Project Logo',
			type: 'image',
			description: 'The logo of the project',
		}),
		defineField({
			name: 'slug',
			title: 'Project Slug',
			type: 'slug',
			options: {
				source: 'title',
			},
		}),
		defineField({
			name: 'description',
			title: 'Project Description',
			type: 'text',
			description: 'A brief overview of the project',
		}),
		defineField({
			name: 'backgroundImage',
			title: 'Project Background Image',
			type: 'image',
			description: 'A background image for the project, used in the project details page',
		}),
		defineField({
			name: 'technologies',
			title: 'Technologies Used',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'skills' } }],
			description:
				'A list of technologies used in the project, referencing the technologies document',
		}),
		defineField({
			name: 'githubLink',
			title: 'GitHub Link',
			type: 'url',
			description: 'The link to the project on GitHub',
		}),
		defineField({
			name: 'liveLink',
			title: 'Live Link',
			type: 'url',
			description: 'The link to the live version of the project',
		}),
		defineField({
			name: 'content',
			title: "Project Breakdown",
			type: 'markdown', // Enables the Markdown editor
			description: "This refers to readme where i break down project to visitors"
		}),
	],
});
