// import { getModelForClass, prop } from '@typegoose/typegoose';

// export class Country {
//   @prop({ ref: () => User, type: () => String })
//   public users?: User[];

//   @prop({ uppercase: true, unique: true })
//   public name: string;
// }

// export class User {
//   @prop({ required: true, unique: true })
//   public username: string;

//   @prop({ required: true })
//   public password: string;

//   @prop({ ref: () => Country, type: () => String })
//   public country?: Country;
// }

// export const UserModel = getModelForClass(User);
// export const CountryModel = getModelForClass(Country);
