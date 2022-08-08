import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt.strategy/guard';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TranslatorModule } from './translator/translator.module';
import { TranslatesModule } from './database/translates/translates.module';
import { UserModule } from './user/user.module';

/*
|--------------------------------------------------------------------------
| Main app moduel
|--------------------------------------------------------------------------
|
| Importing all modules and QG configs.
|
*/

@Module({
  imports: [
    // Database
    DatabaseModule,

    // AUth
    AuthModule,

    // Database translate module
    TranslatesModule,

    // GQ translator module
    TranslatorModule,

    // GQ user module
    UserModule,

    // GraphQL configs
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/app.schema.gql'),
      include: [TranslatorModule, UserModule],
      sortSchema: true,
      playground: true,
      context: ({ req, res }) => ({
        req,
        res,
      }),
    }),
  ],

  // Main controller
  controllers: [AppController],

  // global auth guard
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
