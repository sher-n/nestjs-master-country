import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from '../cat.service';
import { Cat } from '../models/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(): Promise<Cat[] | null> {
    return await this.catsService.findAll();
  }

  @Post()
  async create(@Body() cat: Cat): Promise<Cat> {
    return await this.catsService.create(cat);
  }
}
