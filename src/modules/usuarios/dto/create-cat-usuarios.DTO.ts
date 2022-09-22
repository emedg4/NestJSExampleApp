import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCatUsuariosDTO{
    @ApiProperty()
    @IsString()
    public nom_correo: string;
}
