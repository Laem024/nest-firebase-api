import { Controller, Get } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('users')
export class UsersController {
  constructor(private readonly firebaseService: FirebaseService) {}

  // Endpoint para obtener los nombres de los usuarios
  @Get('names')
  async getUserNames() {
    const users = await this.firebaseService.getData('users');
    const names = users.map(user => user.name);
    return names;
  }

  // Endpoint para obtener los emails de los usuarios
  @Get('emails')
  async getUserEmails() {
    const users = await this.firebaseService.getData('users');
    const emails = users.map(user => user.email);
    return emails;
  }

  // Endpoint para obtener nombres y emails en paralelo
  @Get('names_emails')
  async getNamesAndEmails() {
    // Ejecutar dos consultas en paralelo usando Promise.all
    const [names, emails] = await Promise.all([
      this.getUserNames(),  // Obtener nombres
      this.getUserEmails()  // Obtener emails
    ]);

    return { names, emails };
  }
}
