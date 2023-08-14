import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './models/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';
import { Country } from './models/country.schema';
import * as crypto from 'crypto-js';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Country)
    private readonly countryModel: ReturnModelType<typeof Country>,
  ) {}

  async find(userInput: {
    username: string;
    password: string;
  }): Promise<User | { message: string }> {
    // find username
    const findUser = await this.userModel.find({
      username: userInput.username,
      password: crypto.MD5(userInput.password).toString(),
    });

    return findUser[0];
  }

  async register(registerInput: {
    username: string;
    password: string;
  }): Promise<User | { message: string }> {
    // find username
    const findUser = await this.userModel.find({
      username: registerInput.username,
    });
    if (findUser.length) {
      return { message: 'duplicate username' };
    }

    const findCountry = await this.countryModel.findOne();
    await findCountry.populate('users');
    // create user
    const createdUser = await this.userModel.create({
      username: registerInput.username,
      password: crypto.MD5(registerInput.password).toString(),
      country: findCountry.name,
    });
    await createdUser.save();

    await this.countryModel.findOneAndUpdate({
      users: [...findCountry.users, createdUser],
    });

    return createdUser;
  }

  async create(createUserDto: {
    username: string;
    password: string;
  }): Promise<User> {
    const user = await this.userModel.create(createUserDto);
    return await user.save();
  }

  async delete(): Promise<{ message: string }> {
    await this.userModel.deleteMany();
    return {
      message: 'deleted all record.',
    };
  }

  async findAll(): Promise<User[] | null> {
    const user = await this.userModel.find().exec();
    return user;
  }
}
