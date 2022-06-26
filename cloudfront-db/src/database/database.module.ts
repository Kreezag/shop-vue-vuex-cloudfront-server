import { Product } from "./entities/product.entity";
import { Stock } from "./entities/stock.entity";

import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
      entities: ['dist/database/entities/*.entity.ts'],
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Product, Stock])
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
