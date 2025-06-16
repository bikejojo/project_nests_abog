import { MiddlewareConsumer,  NestModule , Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/interfaces/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import graphqlUploadExpress from 'graphql-upload';
import { ApolloDriver , ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RolesModule } from './modules/roles/interfaces/roles.module';
import { RoleUserModule } from './modules/rolUser/interfaces/roleUser.module';
import { PermissionsModule } from './modules/permissions/interfaces/permissions.module';
import { PermissionsRolsModule } from './modules/permissionsRol/interfaces/permissionsRols.module';
import { PermissionsUserModule } from './modules/userPermissions/interfaces/permissionsUser.module';
import { PersonModule } from './modules/personnel/interfaces/persona/persona.module';
import { LawyerModule } from './modules/personnel/interfaces/lawyer/lawyer.module';
import { CityModule } from './modules/city/interfaces/city.module';
import { BranchOfficeModule } from './modules/branchOffice/interfaces/branchOffice.module';

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
    LawyerModule,
    BranchOfficeModule ,
    CityModule ,
    PersonModule,
    PermissionsModule,
    PrismaModule,
    RoleUserModule,
    PermissionsRolsModule ,
    PermissionsUserModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }))
      .forRoutes('graphql');
  }
}
