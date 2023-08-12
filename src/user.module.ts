import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.schema';
import { UsersController } from './controllers/users.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
