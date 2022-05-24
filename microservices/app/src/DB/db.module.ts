import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

const db_config = {
  host: process.env.DB_HOST ?? 'localhost',
  username: process.env.DB_USER ?? 'myuser',
  port: Number(process.env.DB_PORT) ?? 5432,
  password: 'password',
  database: process.env.DB_NAME ?? 'pizzas'
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...db_config,
      synchronize: true,
      autoLoadEntities: true,
      ssl: false,
    }),
  ],
})
export class DBModule {}
