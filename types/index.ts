import { commentTable } from "@/lib/db/schema";
import { InferInsertModel } from "drizzle-orm";

export type Comment = InferInsertModel<typeof commentTable>