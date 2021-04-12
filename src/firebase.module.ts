import { DynamicModule, Global, Inject, Module } from '@nestjs/common';
import { firestore } from 'firebase-admin/lib/firestore';
import { ServiceAccount } from 'firebase-admin/lib/credential';
import * as admin from 'firebase-admin';
import Firestore = firestore.Firestore;
import { createFirestoreProvider } from './firebase.provider';
import { firestore_instance } from './firebase.constants';
import {
  FirestoreModuleAsyncOptions,
  FirestoreModuleOptions,
} from './interfaces/firebase.interface';
import CollectionReference = firestore.CollectionReference;
import { FirebaseCoreModule } from './firebase.core.module';

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const providers = FirebaseCoreModule.forRoot(options);
    return {
      module: FirebaseModule,
      imports: [providers],
      exports: [providers],
    };
  }

  static forRootAsync(options: FirestoreModuleAsyncOptions): DynamicModule {
    const providers = FirebaseCoreModule.forRootAsync(options);
    return {
      module: FirebaseModule,
      imports: [providers],
      exports: [providers],
    };
  }

  static forFeature(collectionName: string): DynamicModule {
    const providers = createFirestoreProvider(collectionName);
    return {
      module: FirebaseModule,
      imports: [FirebaseModule],
      providers: providers,
      exports: providers,
    };
  }
}
