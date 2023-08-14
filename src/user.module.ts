import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.schema';
import { Country } from './models/country.schema';
import { UsersController } from './controllers/users.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Country]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
