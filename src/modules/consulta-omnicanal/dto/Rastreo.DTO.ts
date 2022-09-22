import { ApiProperty } from "@nestjs/swagger";
import { GuiaDTO } from "./Guia.DTO";

export class RastreoDTO {

    @ApiProperty()
    readonly tipo: string;

    @ApiProperty()
    readonly direccion: string;

    @ApiProperty()
    readonly guias: Array<GuiaDTO>;

    @ApiProperty()
    readonly nom_tienda: string;
}