import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SSOColaboradorDigitalModule } from '../../modules/sso-colaborador-digital/sso-colaborador-digital.module';
import { AuthService } from './auth.service';
import { BearerStrategy } from './strategies/bearer.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [ PassportModule, HttpModule, SSOColaboradorDigitalModule ],
    providers: [LocalStrategy, BearerStrategy, AuthService],
    exports: []
})

export class AuthModule {}