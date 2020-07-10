import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'remotemysql.com',
      port: 3306,
      username: 'ZEgSpQuMPX',
      password: 'nQ6GM88rxv',
      database: 'ZEgSpQuMPX',
      // entities: [User, Chat],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class DBModule {}
