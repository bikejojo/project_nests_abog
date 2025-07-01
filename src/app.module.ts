import { MiddlewareConsumer,  NestModule , Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/interfaces/user.module';
import { GraphQLModule } from '@nestjs/graphql';
const { graphqlUploadExpress } = require('graphql-upload');
import { ApolloDriver , ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PersonModule } from './modules/personnel/interfaces/persona/persona.module';
import { LawyerModule } from './modules/personnel/interfaces/lawyer/lawyer.module';
import { CityModule } from './modules/city/interfaces/city.module';
import { BranchOfficeModule } from './modules/branchOffice/interfaces/branchOffice.module';
import { DocumentsModule } from './modules/documents/interfaces/documents.module';
import { ModuleMenuPermissionModule } from './modules/moduleMenuPermission/interfaces/moduleMenuPermissions.module';
import { JudgeModule } from './modules/personnel/interfaces/judge/judge.module';
import { NaturalPersonModule } from './modules/personnel/interfaces/natural_person/natural_person.module';
import { LegalEntityModule } from './modules/personnel/interfaces/legal_entity/legal_entity.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
     GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    AuthModule,
    UserModule,
    
    BranchOfficeModule ,
    CityModule ,
    DocumentsModule,
    PersonModule,
    JudgeModule,
    LawyerModule,
    NaturalPersonModule ,
    LegalEntityModule,
    PrismaModule,
    ModuleMenuPermissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }))
      .forRoutes('graphql');
  }
}