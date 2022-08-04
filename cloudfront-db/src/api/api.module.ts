import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    ProductModule,
    StockModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
