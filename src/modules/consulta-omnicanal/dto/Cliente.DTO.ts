import { ApiProperty } from "@nestjs/swagger";

export class ClienteDTO {

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly num_ciudad: number;

    @ApiProperty()
    readonly num_tienda: number;

    @ApiProperty()
    readonly nom_tienda: string;

    @ApiProperty()
    readonly num_cliente: number;

    @ApiProperty()
    readonly nom_cliente: string;

    @ApiProperty()
    readonly num_telefono: number;

    @ApiProperty()
    readonly num_telefono_celular: any;

}