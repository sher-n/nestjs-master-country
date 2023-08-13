import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Country } from './models/country.schema';
import { CountriesController } from './controllers/country.controller';
import { CountryService } from './country.service';
import { User } from './models/user.schema';

@Module({
  imports: [
    TypegooseModule.forFeature([Country]),
    TypegooseModule.forFeature([User]),
  ],
  controllers: [CountriesController],
  providers: [CountryService],
})
export class CountriesModule {}
