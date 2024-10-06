import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { FirebaseService } from '../firebase/firebase.service'; // Asegúrate de importar tu servicio de Firebase

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly firebaseService: FirebaseService
  ) {}

  // Registro de usuario
  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña

    // Comprobar si el usuario ya existe
    const users = await this.firebaseService.getData('users');
    const userExists = users.find(user => user.email === email);
    if (userExists) {
      throw new Error('User already exists');
    }

    // Guardar usuario en Firebase
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const userId = await this.firebaseService.addData('users', newUser);
    return { id: userId, name, email };
  }

  // Iniciar sesión
  async login(email: string, password: string) {
    const users = await this.firebaseService.getData('users');
    const user = users.find(user => user.email === email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validar usuario
  async validateUser(email: string): Promise<any> {
    const users = await this.firebaseService.getData('users');
    return users.find(user => user.email === email);
  }
}
