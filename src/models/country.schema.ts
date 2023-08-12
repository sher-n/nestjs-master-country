import { prop } from '@typegoose/typegoose';
import { User } from './user.schema';

export class Country {
  @prop({ ref: () => User, type: () => String })
  public users?: User[];

  @prop({ uppercase: true, unique: true })
  public name: string;
}
