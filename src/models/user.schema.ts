import { Ref, prop } from '@typegoose/typegoose';
import { Country } from './country.schema';

export class User {
  @prop({ required: true, unique: true })
  public username: string;

  @prop({ required: true })
  public password: string;

  @prop({ ref: () => Country.name, type: () => String })
  public country: Ref<Country>;
}
