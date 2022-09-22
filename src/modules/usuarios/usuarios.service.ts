/* eslint-disable @typescript-eslint/camelcase */

import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Usuario } from './entities/usuarios.entity';
import { ssoLoginDTO } from '../../base/auth/dto/sso-login.DTO';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'nestjs-soap';
import { DetalleDeEmpleadoDTO } from './dto/detalle-empleado.DTO';
import { LoggerService } from 'src/base/logger/logger.service';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private logger: LoggerService,
    @Inject('MY_SOAP_CLIENT') private readonly mySoapClient: Client,

  ) {
    this.logger.setContext("UsuariosService")
  }

  public async create(correo:string):Promise<Usuario> {
    const usuario_new = new Usuario;
    usuario_new.nom_correo = correo.toLowerCase();

    const obj_centro =  this.usuariosRepository.create(usuario_new);
    const usuario = await this.usuariosRepository.save(obj_centro);
    
    this.logger.log(`create usuario ${correo}`, usuario)

    return usuario;
  }

  public async getOne(correo:string):Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({nom_correo:correo});
    this.logger.log(`getOne  usuario ${correo}`, usuario)
    
    return usuario;

  }

  public async getAll():Promise<Usuario[]> {
    const usuarios = await this.usuariosRepository.find();
    return usuarios;
  }

  public async detalleDeEmpleado(empleado: ssoLoginDTO) {
    const soapResponseJson : any = {
      num_empleado: '98456512',
      nombre: 'JORGE LUIS',
      apellidopaterno: 'FRAGOZA',
      apellidomaterno: 'GARCIA',
      fechanacimiento: '1988-10-23-07:00',
      rfcempleado: 'FAGJ881023CD5',
      numerocentro: '230397',
      nombrecentro: 'CLCN INTEGRACION Y SOLUCION TE',
      num_gerente: '98289942',
      num_seccion: '126',
      numeropuesto: '487',
      nombrepuesto: 'PROGRAMADOR SENIOR',
      cancelado: '0',
      empresa: '1',
      num_ciudad: '4',
      nom_ciudad: null,
      nom_ciudadinicial: 'CLCN',
      num_region: '1',
      nom_region: 'CULIACAN',
      gerente: '0',
      fechaalta: '2018-01-24-07:00',
      sexo: '2'
    }
    // this.mySoapClient.addHttpHeader('Content-Type', 'application/xml');
    // const soapResponse = await this.mySoapClient.consultaPorEmpleadoAsync({ 'num_empleado': empleado.num_empleado });
    // const soapResponseJson: DetalleDeEmpleadoDTO = soapResponse[0];
  
    const isAdmin = await this.getOne(empleado.correo);
    const permiso: boolean = isAdmin == undefined ? false : true;
    const nivelUsuario: string = permiso == false ? "Usuario" : "Administrador";

      const response = {
        nom_empleado: soapResponseJson.nombre,
        num_centro: soapResponseJson.numerocentro,
        apellidopaterno: soapResponseJson.apellidopaterno,
        apellidomaterno: soapResponseJson.apellidomaterno,
        token: empleado.token,
        correo: empleado.correo,
        num_empleado: empleado.num_empleado 
    }   

    if(await this.cacheManager.get(response.correo) != undefined){
      await this.cacheManager.del(response.correo)
    }
    await this.cacheManager.set(response.correo , {token : response.token , permiso : permiso})

   this.logger.log(`Usuario logueado ${empleado.correo}`, `Usuario >> num_empleado: ${response.num_empleado}, nom_empleado: ${response.nom_empleado} ${response.apellidopaterno} [${nivelUsuario}] `)

    return response;
    
  }

  public async logout(correo : string , token: string) : Promise<any> {
    if((await this.cacheManager.get(correo))['token'] == token)
    {
      await this.cacheManager.del(correo);
    }

    return {
      statusCode : 200,
      message : 'Succesfull'
    }
  }

}
