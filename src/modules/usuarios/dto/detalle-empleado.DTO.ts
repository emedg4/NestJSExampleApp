import { ApiProperty } from "@nestjs/swagger";

export class DetalleDeEmpleadoDTO {
    @ApiProperty()
    readonly num_empleado: string;

    @ApiProperty()
    readonly nombre: string;

    @ApiProperty()
    readonly apellidopaterno: string;

    @ApiProperty()
    readonly apellidomaterno: string;

    @ApiProperty()
    readonly fechanacimiento: string;

    @ApiProperty()
    readonly rfcempleado: string;

    @ApiProperty()
    readonly numerocentro: string;

    @ApiProperty()
    readonly nombrecentro: string;

    @ApiProperty()
    readonly num_gerente: string;

    @ApiProperty()
    readonly num_seccion: string;

    @ApiProperty()
    readonly numeropuesto: string;

    @ApiProperty()
    readonly nombrepuesto: string;

    @ApiProperty()
    readonly cancelado: string;

    @ApiProperty()
    readonly empresa: string;

    @ApiProperty()
    readonly num_ciudad: string;

    @ApiProperty()
    readonly nom_ciudad: string;

    @ApiProperty()
    readonly nom_ciudadinicial: string;

    @ApiProperty()
    readonly num_region: string;

    @ApiProperty()
    readonly nom_region: string;

    @ApiProperty()
    readonly gerente: string;

    @ApiProperty()
    readonly fechaalta: string;

    @ApiProperty()
    readonly sexo: string;

}