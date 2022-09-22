import { ApiProperty } from "@nestjs/swagger";

export class ArticuloDTO {

    @ApiProperty()
    readonly codigo: string;

    @ApiProperty()
    readonly descripcion: string;

    @ApiProperty()
    readonly talla: string;

    @ApiProperty()
    readonly cantidad: number;

    @ApiProperty()
    readonly imagen: string;

    @ApiProperty()
    readonly precio_unitario: string;

    @ApiProperty()
    readonly estado_articulo: string;

}