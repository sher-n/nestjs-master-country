import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

const verify = (JwtService: JwtService, token: string) => {
  try {
    const decode = JwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    if (decode.username) return true;
  } catch (error) {
    return false;
  }

  return false;
};

export default verify;
