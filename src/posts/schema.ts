import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { users } from "src/users/schema";

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  userId: integer('user_id').references(() => users.id).notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
