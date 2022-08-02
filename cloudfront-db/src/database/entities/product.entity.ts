import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: "text", nullable: false })
  title: string;

  @Column({type: "text", nullable: false })
  description: string;

  @Column({type: "int4", nullable: false})
  price: number;
}
