import { CACHE_MANAGER, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, UseInterceptors , Headers, UseGuards, Query} from "@nestjs/common";
import { ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Menu } from "./entities/menu.entity";
import { MenuService } from "./menu.service";
import { Cache } from 'cache-manager';
import { BearerAuthGuard } from "src/base/auth/guards/bearer-auth.guard";

@UseGuards(BearerAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('menu')
@ApiUnauthorizedResponse({description: 'No cuenta con permisos para este recurso."'})
@Controller('menu')
export class MenuController {
    constructor(
        private readonly menuService: MenuService, @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {

    }

    @ApiOkResponse({type: Menu , isArray:true })
    @Get('getmenu')
    async findAll(@Headers('authorization') authorization: string , @Query('nom_correo') nom_correo: string): Promise<Menu[]> {
        const token = authorization.split(" ")[1];
        if((await this.cacheManager.get(nom_correo))['token'] == token){
            return await this.menuService.findAll((await this.cacheManager.get(nom_correo))['permiso']);    
        }
        throw new HttpException('No cuenta con permisos para este recurso.', HttpStatus.UNAUTHORIZED);     
    }
}
