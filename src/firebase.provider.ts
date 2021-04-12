import { firestore } from 'firebase-admin/lib/firestore';
import Firestore = firestore.Firestore;
import { Provider } from '@nestjs/common';
import { firestore_instance } from './firebase.constants';
import CollectionReference = firestore.CollectionReference;
import * as admin from 'firebase-admin';

export function createFirestoreProvider(collectionName: string): Provider[] {
  return [
    {
      provide: collectionName,
      useFactory: (
        firestore: Firestore,
      ): Promise<CollectionReference> | CollectionReference => {
        return firestore.collection(collectionName);
      },
      inject: [firestore_instance],
    },
  ];
}
