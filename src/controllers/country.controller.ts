import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { CountryService } from '../country.service';
import { Country } from 'src/models/country.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Country Module')
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
  async createTest(
    @Req() req: { headers: { sig: string }; query: { isValid: any } },
    @Body() body: any,
  ): Promise<any> {
    console.log(req.headers.sig, body);
    if (req.query.isValid == 'false') return 'Unauthorized';
    return 'ok';
  }

  @Delete()
  async delete(): Promise<{ message: string }> {
    return await this.countryService.delete();
  }
}
