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
    const createdCountry = new this.countryModel(createCountryDto);
    return await createdCountry.save();
  }

  async createTest(createCountryDto: { name: string }): Promise<Country> {
    const user = await new this.userModel({
      username: 'ccc1',
      password: '123',
    });
    await user.save();

    const findCountry = await this.countryModel.findOne();

    const country = await new this.countryModel({
      name: createCountryDto.name,
      users: [user],
    });

    console.log({
      findCountry,
    });
    return await country.save();
  }

  async addPeopleToCountry(userObj: { name: string }): Promise<Country> {
    const findCountry = await this.countryModel.findOne();
    const country = await findCountry.populate('users');
    const user = await new this.userModel({
      username: userObj.name,
      password: '123',
      country: country,
    });
    await user.save();
    await this.countryModel.findOneAndUpdate({
      users: [...findCountry.users, user],
    });
    console.log({
      findCountry,
      country,
      user,
      id: findCountry.users,
    });
    return await country.save();
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
