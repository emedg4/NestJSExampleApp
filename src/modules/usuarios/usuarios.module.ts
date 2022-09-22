import { Module, HttpModule } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { SSOColaboradorDigitalModule } from '../sso-colaborador-digital/sso-colaborador-digital.module';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuarios.entity';
import { UtilModule } from '../../base/util/util.module';
import { ConfigService } from '@nestjs/config';
import { SoapModule } from 'nestjs-soap';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), SSOColaboradorDigitalModule, HttpModule, UtilModule,SoapModule.forRootAsync(
   [{
      name: "MY_SOAP_CLIENT",
      useFactory: (configService : ConfigService) => {
        return {
        uri: configService.get('soap_config.url'),
        clientOptions: {
          overrideRootElement: {
            namespace: configService.get('soap_config.namespace'),
            xmlnsAttributes: []
          }
        }
      }
    },
    inject: [ConfigService]
   }]
  )], 
  controllers: [UsuariosController],
  exports: [UsuariosService],
  providers: [UsuariosService],
  
})
export class UsuariosModule {}
