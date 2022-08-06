import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Stock } from "../../database/entities/stock.entity";
import { Repository } from "typeorm";

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>
  ) {}

  create(createStockDto: CreateStockDto) {
    return this.stockRepository.insert(createStockDto)
      .then(r => {
        console.log(JSON.stringify(r))

        return true
      })
      .catch(() => {
        return false
      })
  }

  findAll() {
    return this.stockRepository.find();
  }

  findOne(id: string) {
    return this.stockRepository.findOne({
      where: {
        id
      }
    });
  }

  update(id: string, updateStockDto: UpdateStockDto) {
    return this.stockRepository.update({ id }, updateStockDto)
      .then(r => {
        console.log(JSON.stringify(r))

        return true
      })
      .catch(() => {
        return false
      })
  }

  remove(id: string) {
    return this.stockRepository.delete({ id })
      .then(r => {
        console.log(JSON.stringify(r))

        return true
      })
      .catch(() => {
        return false
      })
  }
}
