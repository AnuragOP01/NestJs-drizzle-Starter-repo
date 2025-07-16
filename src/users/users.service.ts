import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.connection';
import { users } from './schema';

@Injectable()
export class UsersService {
  constructor(@Inject(DATABASE_CONNECTION) private db: any) {}

  async create(data: { name: string; email: string }) {
    return this.db.insert(users).values(data).returning();
  }

  async findAll() {
    return this.db.select().from(users);
  }

//   async findOne(id: number) {
//     return this.db.select().from(users).where(users.id.eq(id));
//   }
}
