import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Product } from "./entities/product.entity";
import { Stock } from "./entities/stock.entity";
import { ConfigModule,ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        synchronize: true,
        name: configService.get('DATABASE_NAME'),
        entities: [Product, Stock],
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Product, Stock])
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
