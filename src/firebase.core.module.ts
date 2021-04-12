import { DynamicModule, Inject, Module, Provider } from '@nestjs/common';
import {
  FirestoreModuleAsyncOptions,
  FirestoreModuleOptions,
} from './interfaces/firebase.interface';
import * as admin from 'firebase-admin';
import { firebase_instance, firestore_instance } from './firebase.constants';
import { firestore } from 'firebase-admin/lib/firestore';
import Firestore = firestore.Firestore;

@Module({})
export class FirebaseCoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const firestoreProvider = {
      provide: firestore_instance,
      useFactory: async (firebase): Promise<any> => {
        return firebase.firestore();
      },
      inject: [firebase_instance],
    };

    const firebaseProvider = {
      provide: firebase_instance,
      useFactory: async (): Promise<any> => {
        return admin.initializeApp({
          credential: admin.credential.cert(options.credentials),
        });
      },
    };
    return {
      module: FirebaseCoreModule,
      providers: [firestoreProvider, firebaseProvider],
      exports: [firestoreProvider, firebaseProvider],
    };
  }

  static forRootAsync(options: FirestoreModuleAsyncOptions): DynamicModule {
    const firebaseProvider = {
      provide: firebase_instance,
      useFactory: async (
        firestoreModuleOptions: FirestoreModuleOptions,
      ): Promise<any> => {
        return admin.initializeApp({
          credential: admin.credential.cert(firestoreModuleOptions.credentials),
        });
      },
      inject: ['FIRESTORE_MODULE_OPTIONS'],
    };

    const firestoreProvider = {
      provide: firestore_instance,
      useFactory: async (firebase): Promise<any> => {
        return firebase.firestore();
      },
      inject: [firebase_instance],
    };

    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: FirebaseCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, firestoreProvider, firebaseProvider],
      exports: [firestoreProvider, ...asyncProviders, firebaseProvider],
    };
  }

  private static createAsyncProviders(
    options: FirestoreModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
  }

  private static createAsyncOptionsProvider(
    options: FirestoreModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: 'FIRESTORE_MODULE_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
  }

  private static fireStoreProvider() {
    return {
      provide: firestore_instance,
      useFactory: async (firebase): Promise<any> => {
        return firebase.firestore();
      },
      inject: [firebase_instance],
    };
  }
}
