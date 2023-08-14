import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { verifyMiddleware } from './common/middleware/verify.middleware';
import { TypegooseModule } from 'nestjs-typegoose';
import { CountryModule } from './country.module.js';
import { UserModule } from './user.module.js';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { JwtModule } from '@nestjs/jwt';
dotenv.config();

@Module({
  imports: [
    TypegooseModule.forRoot(process.env.DB_CONN_STRING),
    CountryModule,
    UserModule,
    SwaggerModule,
    JwtModule,
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyMiddleware).forRoutes('countries/test');
    consumer.apply(verifyMiddleware).forRoutes('users');
  }
}
