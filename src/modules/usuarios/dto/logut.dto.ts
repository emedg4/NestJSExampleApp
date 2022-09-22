import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogoutDTO {


    @ApiProperty()
    @IsString()
    public nom_correo: string;

    @ApiProperty()
    @IsString()
    public token: string;
}