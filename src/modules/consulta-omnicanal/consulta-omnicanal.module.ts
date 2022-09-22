import {  HttpModule, Module } from '@nestjs/common';
import { SsoApplicationModule } from '../sso-application/sso-application.module';
import { ConsultaOmnicanalController } from './consulta-omnicanal.controller';
import { ConsultaOmnicanalService } from './consulta-omnicanal.service';
@Module({
  imports: [HttpModule , SsoApplicationModule],
  controllers: [ConsultaOmnicanalController],
  providers: [ConsultaOmnicanalService]
})
export class ConsultaOmnicanalModule { }
