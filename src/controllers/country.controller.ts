import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CountryService } from '../country.service';
import { Country } from 'src/models/country.schema';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getCountries(): Promise<Country[] | null> {
    return await this.countryService.findAll();
  }

  @Post()
  async create(@Body() country: Country): Promise<Country> {
    return await this.countryService.create(country);
  }

  @Delete()
  async delete(): Promise<{ message: string }> {
    return await this.countryService.delete();
  }
}
