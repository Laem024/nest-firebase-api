import { Controller, Get, Post, Body } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  // Ruta para obtener todos los documentos de una colección
  @Get('data')
  async getData() {
    const data = await this.firebaseService.getData('users');
    return data;
  }

  // Ruta para añadir un documento a una colección
  @Post('data')
  async addData(@Body() body: any) {
    const docId = await this.firebaseService.addData('users', body);
    return { id: docId };
  }
}
