import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/interfaces/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver , ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CompanyModule } from './modules/personnel/interfaces/company/company.module';
import { LawyerModule } from './modules/personnel/interfaces/lawyer/lawyer.module';
import { RolesModule } from './modules/roles/interfaces/roles.module';
import { RoleUserModule } from './modules/rolUser/interfaces/roleUser.module';
import { PermissionsModule } from './modules/permissions/interfaces/permissions.module';
import { PermissionsRolsModule } from './modules/permissionsRol/interfaces/permissionsRols.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    UserModule,
    CompanyModule,
    PermissionsModule,
    LawyerModule, 
    PrismaModule,
    RoleUserModule,
    PermissionsRolsModule ,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
