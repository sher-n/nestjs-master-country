import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { UserService } from '../user.service';
import { User } from 'src/models/user.schema';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import verify from 'src/utils/verify';

@ApiTags('User Module')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get()
  @ApiHeader({
    name: 'auth',
    required: true,
    description: 'JWT token from login',
  })
  getUsers(
    @Req() req: { header: { auth: string }; query: { isValid: string } },
  ): Promise<User[]> | string {
    if (verify(this.jwtService, req.header.auth)) return 'unauthorized';

    return this.userService.findAll();
  }
  @Post('login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  async create(@Body() user: { username: string; password: string }): Promise<{
    token?: string;
    message?: string;
  }> {
    if (!user.username || !user.password) {
      return { message: 'Please provide username and password' };
    }

    const findUser = await this.userService.find(user);

    if (!findUser)
      return {
        message: 'Invalid username or password.',
      };

    return {
      token: this.jwtService.sign(
        { username: user.username },
        { privateKey: process.env.JWT_SECRET },
      ),
    };
  }

  @Post('register')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'This is unique name.',
        },
        password: {
          type: 'string',
          description: 'This is pasword',
        },
      },
    },
  })
  register(
    @Body()
    registerInput: {
      username: string;
      password: string;
    },
  ): Promise<User | { message: string }> {
    return this.userService.register(registerInput);
  }

  @Delete()
  delete(): Promise<User | { message: string }> {
    return this.userService.delete();
  }
}
