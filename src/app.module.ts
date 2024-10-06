import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [FirebaseModule, AuthModule, JwtModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
