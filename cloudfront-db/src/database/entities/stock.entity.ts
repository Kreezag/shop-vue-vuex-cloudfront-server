import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiTags } from "@nestjs/swagger";


@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: "uuid", nullable: false })
  product_id: string;

  @Column({type: "number", nullable: false})
  count: number;
}
