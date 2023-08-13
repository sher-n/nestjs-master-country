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

  @Post('test')
  async createTest(@Body() country: Country): Promise<Country> {
    return await this.countryService.createTest(country);
  }

  @Post('add')
  async addPeople(@Body() country: Country): Promise<Country> {
    return await this.countryService.addPeopleToCountry(country);
  }

  @Delete()
  async delete(): Promise<{ message: string }> {
    return await this.countryService.delete();
  }
}
