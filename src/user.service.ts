import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './models/user.schema';
import { ReturnModelType } from '@typegoose/typegoose';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

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
    return await this.userModel.find().exec();
  }
}
