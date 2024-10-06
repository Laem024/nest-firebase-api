import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { FirebaseModule } from '../firebase/firebase.module';  // Importar FirebaseModule

@Module({
  imports: [FirebaseModule],  // Importar aquí
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
