import { text, boolean, pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';

export const todo = pgTable('todo', {
  id: uuid('id').primaryKey().defaultRandom(),
  text: text('text').notNull(),
  done: boolean('done').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updateAt: timestamp('updated_at').defaultNow(),
});
