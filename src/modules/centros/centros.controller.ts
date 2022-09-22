import { Body, Controller, Get , ParseIntPipe  , Post, Patch , UseGuards, ValidationPipe, UseInterceptors , ClassSerializerInterceptor, Query, HttpException, HttpStatus} from '@nestjs/common';
import {  ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BearerAuthGuard } from '../../base/auth/guards/bearer-auth.guard';
import { CentrosService } from './centros.service';
import { CreateCentroDTO } from './dto/create-centro.dto';
import { PaginationCentroDTO } from './dto/pagination-centro.dto';
import { UpdateCentroDTO } from './dto/update-centro.dto';
import { Centro } from './entities/centro.entity';

@UseGuards(BearerAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('centros' )
@ApiResponse({status:401 , description: "No tiene permisos para este recurso."})
@Controller('centros')
export class CentrosController {

    constructor(private readonly centrosService: CentrosService
    ) {

    }

    @ApiOkResponse({type: Centro , isArray:true })
    @Get('getcentros')
    async findAll(): Promise<Centro[]> {
        return  await this.centrosService.findAll();
    }

    @ApiOkResponse({type: Centro})
    @Get('getcentro')
    async findOne(@Query('id', new ParseIntPipe()) num_centro: number): Promise<Centro> {
        return await this.centrosService.findOne(num_centro);
    }


    @ApiOkResponse({type: PaginationCentroDTO})
    @Get('getcentros/pagination')
    async findPagination(@Query('take', new ParseIntPipe()) take: number, @Query('skip', new ParseIntPipe()) skip: number): Promise<PaginationCentroDTO> {
        return await this.centrosService.findPagination(take, skip);
    }

    @ApiResponse({status:201 , type: Centro})
    @Post()
    async createCentro(@Body(new ValidationPipe({transform:true})) createCentroDTO: CreateCentroDTO): Promise<Centro> {
        const centro  = await this.centrosService.findByNumCentro(createCentroDTO.num_centro);

        if(centro && centro.opt_centro){
            throw new HttpException(`El centro ${centro.num_centro} ya existe`  , HttpStatus.CONFLICT)
        }

        return await this.centrosService.create(centro, createCentroDTO);
    }

    @ApiOkResponse({type: Centro})
    @Patch()
    async updateStatusCentro(@Body(new ValidationPipe()) updateCentroDTO: UpdateCentroDTO): Promise<Centro> {
        const centro  = await this.centrosService.findByNumCentro(updateCentroDTO.num_centro);

        if(!centro){
            throw new HttpException(`El centro ${updateCentroDTO.num_centro} no se encontro` , HttpStatus.CONFLICT)
        }

        return await this.centrosService.updateStatus(centro,updateCentroDTO);
    }
}
