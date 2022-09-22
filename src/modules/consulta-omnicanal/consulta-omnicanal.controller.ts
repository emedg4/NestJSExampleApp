import { Controller, Get, Query, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { StringPipe } from 'src/base/pipes/string.pipes';
import { OrdenPipe } from 'src/base/pipes/orden.pipe';
import { ConsultaOmnicanalService } from './consulta-omnicanal.service';
import { TrackingResponseDTO } from './dto/TrackingResponse.DTO';
import { TrackingResponseDetalleDTO } from './dto/TrackingResponseDetalle.DTO';
import { BearerAuthGuard } from 'src/base/auth/guards/bearer-auth.guard';

@UseGuards(BearerAuthGuard)
@ApiTags('consulta-omnicanal')
@ApiUnauthorizedResponse({description: 'No cuenta con permisos para este recurso."'})
@ApiInternalServerErrorResponse({description: 'Ocurrio un error al consultar la orden'})
@Controller('consulta-omnicanal')
export class ConsultaOmnicanalController {
    constructor(readonly consultaOmnicanalService: ConsultaOmnicanalService) {
    }
    
    @ApiOkResponse({type: TrackingResponseDTO})
    @Get('getorden')
    async consultar(@Query('orden', new OrdenPipe()) orden : string ) : Promise<TrackingResponseDTO> {
        let consultaOmnicanal = await this.consultaOmnicanalService.consultarTrackingOmnicanalPorOrden(orden);

        if(consultaOmnicanal.meta.statusCode != 200){
            throw new HttpException(`Ocurrio un error al consultar la orden`, HttpStatus.INTERNAL_SERVER_ERROR); 
        }

        return consultaOmnicanal;  
    }

    @ApiOkResponse({type: TrackingResponseDetalleDTO})
    @Get('getordenby')
    async detalle(@Query('orden', new OrdenPipe()) orden : string,  @Query('id', new StringPipe()) id : string, @Query('codigoArticulo', new StringPipe()) codigoArticulo : string):Promise<TrackingResponseDetalleDTO> {
        const token = await this.consultaOmnicanalService.obtenerTokenApp();
        
        let respuestaOmnicanal = await this.consultaOmnicanalService.consultarTrackingOmnicanalPorOrden(orden );

       if(respuestaOmnicanal.meta.statusCode != 200){
            throw new HttpException(`Ocurrio un error al consultar la orden`, HttpStatus.INTERNAL_SERVER_ERROR); 
        }

        let detalleOnmicanal = await this.consultaOmnicanalService.consultarTrackingDetalle(respuestaOmnicanal , id , codigoArticulo);

        return detalleOnmicanal;
    }
}