import { HttpModule, HttpService, Module } from '@nestjs/common';
import { SSOColaboradorDigitalService } from './sso-colaborador-digital.service';

@Module({
    imports: [ HttpModule],
    providers: [ SSOColaboradorDigitalService ],
    exports: [ SSOColaboradorDigitalService ]
})

export class SSOColaboradorDigitalModule {}
