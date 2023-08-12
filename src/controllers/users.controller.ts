import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../user.service';
import { User } from 'src/models/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post()
  register(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
}
