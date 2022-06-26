import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiTags } from "@nestjs/swagger";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: "text", nullable: false })
  title: string;

  @Column({type: "text", nullable: false })
  description: string;

  @Column({type: "number", nullable: false})
  price: number;
}

//
// id: '19ba3d6a-f8ed-491b-a192-0a33b71b38c4'
// title: 'Product Title',
//   description: 'This product ...',
//   price: 200
