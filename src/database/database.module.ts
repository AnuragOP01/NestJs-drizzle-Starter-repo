import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as userSchema from '../users/schema';
import * as postSchema from '../posts/schema';
import { DATABASE_CONNECTION } from './database.connection';

const combinedSchema = {
  ...userSchema,
  ...postSchema,
};

@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
        });

        return drizzle(pool, {
          schema: combinedSchema,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION], // ✅ export this so other modules can use it
})
export class DatabaseModule {}
