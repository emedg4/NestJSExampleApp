import { ApiProperty } from "@nestjs/swagger";

export class RemisionDTO {
    @ApiProperty()
    readonly ropa: number;

    @ApiProperty()
    readonly muebles: number;
}