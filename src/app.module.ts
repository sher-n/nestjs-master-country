import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CatsModule } from './cat.module.js';
import { CountriesModule } from './country.module.js';
import { UserModule } from './user.module.js';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypegooseModule.forRoot(
      'mongodb+srv://admin:pass@cluster1.6gsaezt.mongodb.net/default?retryWrites=true&w=majority',
    ),
    CatsModule,
    CountriesModule,
    UserModule,
  ],
})
export class ApplicationModule {}

// import { Module } from '@nestjs/common';
// import { AppController } from './controllers/app.controller';
// import { UsersController } from './controllers/users.controller';
// import { AppService } from './app.service';
// import * as dotenv from 'dotenv';
// import { MongooseModule } from '@nestjs/mongoose';
// dotenv.config();

// @Module({
//   imports: [MongooseModule.forRoot(process.env.DB_CONN_STRING)],
//   controllers: [AppController, UsersController],
//   providers: [AppService],
// })
// export class AppModule {}
