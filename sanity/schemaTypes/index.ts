import blogs from './blogs';
import action from './action';
import skills from './skills';
import career from './career';
import projects from './projects';

import { type SchemaTypeDefinition } from 'sanity';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [action, projects, skills, blogs, career],
};