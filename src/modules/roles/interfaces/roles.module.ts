import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { RolesRepository } from '../infraestructura/roles.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesUseCase } from '../domain/service/roles.use-case';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { RolesResolver } from './roles.resolver';

@Module({
    imports: [
        AuthModule,
        JwtModule.register({
            secret:jwtConstants.secret,
            signOptions: {expiresIn:'id'}
        })
    ],
    providers: [
        RolesRepository,
        PrismaService,
        RolesUseCase,
        RolesResolver
    ],
    exports: [
        RolesUseCase,
        RolesRepository
    ]
})

export class RolesModule {}
