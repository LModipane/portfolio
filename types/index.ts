import { InferInsertModel } from 'drizzle-orm';
import { commentTable, profileTable } from '@/lib/db/schema';

export type Comment = InferInsertModel<typeof commentTable>;
export type Profile = InferInsertModel<typeof profileTable>;

export type Role = 'general' | 'data_science' | 'cloud_engineer' | "software_developer";
