import { ApiProperty } from "@nestjs/swagger";

export class CreateStockDto {
  @ApiProperty()
  product_id: string;

  @ApiProperty()
  count: number;
}
