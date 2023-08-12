import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Country } from './models/country.schema';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country)
    private readonly countryModel: ReturnModelType<typeof Country>,
  ) {}

  async create(createCountryDto: { name: string }): Promise<Country> {
    const createdCountry = new this.countryModel(createCountryDto);
    return await createdCountry.save();
  }

  async delete(): Promise<{ message: string }> {
    await this.countryModel.deleteMany();
    return {
      message: 'deleted all record.',
    };
  }

  async findAll(): Promise<Country[] | null> {
    return await this.countryModel.find().exec();
  }
}
