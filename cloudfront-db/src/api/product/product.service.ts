import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../../database/entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.insert(createProductDto)
      .then(r => {
        console.log(JSON.stringify(r))

        return true
      })
      .catch(() => {
        return false
      })
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update({ id }, updateProductDto)
      .then(r => {
        console.log(JSON.stringify(r))

        return true
      })
      .catch(() => {
        return false
      })
  }

  remove(id: string) {
    return this.productRepository.delete({ id })
      .then(r => {
        console.log(JSON.stringify(r))

        return true
      })
      .catch(() => {
        return false
      })
  }
}
