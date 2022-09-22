import { Controller, Get, Post ,Request, UseGuards, ConflictException, Body, ValidationPipe, HttpException, HttpStatus, Res, HttpCode} from '@nestjs/common';

import { LocalAuthGuard } from '../../base/auth/guards/local-auth.guard';
import { UsuariosService } from './usuarios.service';
import { BearerAuthGuard } from '../../base/auth/guards/bearer-auth.guard';
import { CreateCatUsuariosDTO } from './dto/create-cat-usuarios.DTO';
import { Usuario } from './entities/usuarios.entity';
import { ApiConflictResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { DetalleDeEmpleadoDTO } from './dto/detalle-empleado.DTO';
import { LoggerService } from 'src/base/logger/logger.service';
import { LogoutDTO } from './dto/logut.dto';

@ApiTags( 'usuarios' )
@ApiUnauthorizedResponse({description: 'No cuenta con permisos para este recurso.'})
@Controller('usuarios')
export class UsuariosController {
    constructor(
        private readonly usuariosService: UsuariosService,
        private logger: LoggerService
    ) { }
    
    @UseGuards(BearerAuthGuard) 
    @ApiOkResponse({type: Usuario , isArray:true })
    @Get()
    async getAll(): Promise<Usuario[]> {
        return await this.usuariosService.getAll();
    }
    
    @UseGuards(BearerAuthGuard)
    @ApiOkResponse({type: Usuario })
    @Post()
    async create(@Body(new ValidationPipe())createUsuarioDTO: CreateCatUsuariosDTO):Promise<Usuario> {
       this.logger.log(`create controller`, createUsuarioDTO)
       const usuario = await this.usuariosService.getOne(createUsuarioDTO.nom_correo);

       if(usuario ){
            this.logger.log(`El usuario ya existe`, createUsuarioDTO.nom_correo);
            throw new HttpException(`El usuario ${createUsuarioDTO.nom_correo} ya existe` , HttpStatus.CONFLICT)
       }
        
       return await this.usuariosService.create(createUsuarioDTO.nom_correo);
    }
   
    @UseGuards(LocalAuthGuard)
    @ApiOkResponse({type: DetalleDeEmpleadoDTO })
    @ApiConflictResponse({description: 'Ocurrio un error en el login'})
    @Post('login')
    async login(@Request() req) {
        this.logger.log(`login controller`, req.user)
        const loginResponse: Object = await this.usuariosService.detalleDeEmpleado(req.user)    
        if(!loginResponse){
            throw new HttpException(`Ocurrio un error en el login` , HttpStatus.CONFLICT)
        }

        return loginResponse;
    }

    @Post('logout')
    async logout(@Body(new ValidationPipe()) logoutDTO: LogoutDTO) : Promise<any>{
        return await this.usuariosService.logout(logoutDTO.nom_correo , logoutDTO.token);
    }
}
