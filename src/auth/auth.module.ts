import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseModule } from '../firebase/firebase.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    FirebaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'shdhrdhjergbfdn2f1ds5snh5e021dn5fd1h51sfn50dshb1gd5m165fd1n9f148mfdb5s1dnb51fdn6sd1b6',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
