import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Cat } from './models/cat.schema';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat) private readonly catModel: ReturnModelType<typeof Cat>,
  ) {}

  async create(createCatDto: { name: string }): Promise<Cat> {
    console.log({ createCatDto });
    const createdCat = new this.catModel(createCatDto);
    return await createdCat.save();
  }

  async findAll(): Promise<Cat[] | null> {
    return await this.catModel.find().exec();
  }
}
