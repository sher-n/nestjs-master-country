import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class verifyMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const decode = this.jwtService.verify(req.headers.authorization || '', {
        secret: process.env.JWT_SECRET,
      });

      req.query.isValid = decode.username ? 'true' : 'false';
    }
    next();
  }
}
