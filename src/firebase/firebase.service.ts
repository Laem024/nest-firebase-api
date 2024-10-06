import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../../firebase/firebase-adminsdk.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: 'https://db-paralelo.firebaseio.com',  // Cambia <your-project-id> por tu ID de proyecto
    });
  }

  // Método para obtener datos desde Firestore
  async getData(collection: string) {
    const db = admin.firestore();
    const snapshot = await db.collection(collection).get();
    return snapshot.docs.map(doc => doc.data());
  }

  // Método para añadir datos a Firestore
  async addData(collection: string, data: any) {
    const db = admin.firestore();
    const res = await db.collection(collection).add(data);
    return res.id;
  }
}
