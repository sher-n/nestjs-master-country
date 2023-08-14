import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Country } from './models/country.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from './models/user.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country)
    private readonly countryModel: ReturnModelType<typeof Country>,
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(createCountryDto: { name: string }): Promise<Country> {
    const country = await this.countryModel.findOne();
    if (!country?._id) {
      const createdCountry = new this.countryModel(createCountryDto);
      return await createdCountry.save();
    }
    return await country;
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
