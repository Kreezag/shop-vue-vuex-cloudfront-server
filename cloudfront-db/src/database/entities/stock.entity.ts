import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: "uuid", nullable: false })
  product_id: string;

  @Column({type: "int4", nullable: false})
  count: number;
}
