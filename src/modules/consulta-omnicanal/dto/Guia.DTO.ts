import { ApiProperty } from "@nestjs/swagger";
import { ArticuloDTO } from "./Articulo.DTO";
import { MovimientoDTO } from "./Movimiento.DTO";

export class GuiaDTO {

    @ApiProperty()
    readonly guia: string;

    @ApiProperty()
    readonly paquetera: string;

    @ApiProperty()
    readonly articulos: Array<ArticuloDTO>

    @ApiProperty()
    readonly movimientos: Array<MovimientoDTO>

    @ApiProperty()
    readonly link_rastreo: string;

    @ApiProperty()
    readonly fecha_promesa: string;

}