import { Ref, prop } from '@typegoose/typegoose';
import { User } from './user.schema';

export class Country {
  @prop({ ref: () => User, type: () => User })
  public users?: Ref<User>[];

  @prop({ uppercase: true, unique: true })
  public name: string;
}
