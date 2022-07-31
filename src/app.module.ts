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

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TranslatesModule,
    TranslatorModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/app.schema.gql'),
      include: [TranslatorModule],
      sortSchema: true,
      playground: true,
      context: ({ req, res }) => ({
        req,
        res,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
