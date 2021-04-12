import { ServiceAccount } from 'firebase-admin/lib/credential';
import { ModuleMetadata, Type } from '@nestjs/common';

export interface FirestoreModuleOptions
  extends Pick<ModuleMetadata, 'imports'> {
  credentials: ServiceAccount;
}

export interface FirestoreModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<FirestoreModuleOptions> | FirestoreModuleOptions;
  inject?: any[];
}
