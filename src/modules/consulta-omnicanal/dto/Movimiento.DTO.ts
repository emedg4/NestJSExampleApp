import { ApiProperty } from "@nestjs/swagger";

export class MovimientoDTO {

    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly descripcion: string;

    @ApiProperty()
    readonly activo: number;
}