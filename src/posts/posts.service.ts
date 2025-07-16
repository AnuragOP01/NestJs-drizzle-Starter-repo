import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.connection';
import { posts } from './schema';

@Injectable()
export class PostsService {
  constructor(@Inject(DATABASE_CONNECTION) private db: any) {}

  async create(data: { title: string; content?: string; userId: number }) {
    return this.db.insert(posts).values(data).returning();
  }

  async findAll() {
    return this.db.select().from(posts);
  }
}
