import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    try {
      // await CountryModel.createCollection({ dbName: 'countries' });
    } catch (error) {
      console.log(error);
    }
    console.log('okkk');
    return 'Hello World!';
  }
  getUsers(): string {
    return 'userok';
  }
}
