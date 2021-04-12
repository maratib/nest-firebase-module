# Nest Firebase Module

### Installation

This module requires [Nestjs](https://nestjs.com/) to run.

```sh
$ npm install --save nest-firebase-module
```

### Examples

you can import firebase module like this

```sh
  import {FirebaseModule } from 'nest-firebase-module'

    imports: [
    FirebaseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        credentials: {
          privateKey: config.firebasePrivateKey,
          projectId: config.firebaseProjectId,
          clientEmail: config.firebaseClientEmail,
        },
      }),
      inject: [ConfigService],
    }),
    ]
```

and in your service file

```sh
    @Inject('Firestore')
    private readonly firestore,

    @Inject('Firebase')
    private readonly firebase,

```

If your project is using firestore as its core db. you can inject collection like

```sh
FirebaseModule.forFeature('collectionName')
```

and in your service,

```sh
    @Inject('collectionName')
    private readonly collectionName,
```

### To contribute

This is the base repo, you can contribute to it to expose more functionality of firebase

### TODOs

- inject firebase subscriptions in decorators style
- firestore schema validation like mongoose
