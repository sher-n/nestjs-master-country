import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Country } from './models/country.schema';
import { CountriesController } from './controllers/country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [TypegooseModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountryService],
})
export class CountriesModule {}
