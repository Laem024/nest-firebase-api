import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'shdhrdhjergbfdn2f1ds5snh5e021dn5fd1h51sfn50dshb1gd5m165fd1n9f148mfdb5s1dnb51fdn6sd1b6', // Usa la misma clave secreta que en el módulo de JWT
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
