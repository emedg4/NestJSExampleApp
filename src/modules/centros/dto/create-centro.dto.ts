import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, Min, Max, Length} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Expose()
export class CreateCentroDTO {
    @ApiProperty()
    @IsInt()
    @Min(100000)
    @Max(999999)
    public num_centro: number;

    @ApiProperty()
    @IsString()
    @Length(0, 50)
    public nom_centro: string;

    @ApiProperty()
    @IsString()
    @Length(0, 250)
    public des_centro: string;

    @Exclude()
    @IsBoolean()
    public opt_centro : boolean  = true;
}
