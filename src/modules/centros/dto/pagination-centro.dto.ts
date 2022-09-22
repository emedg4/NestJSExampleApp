import { ApiProperty } from '@nestjs/swagger';
import { IsInt} from 'class-validator';
import { Expose } from 'class-transformer';
import { CreateCentroDTO } from './create-centro.dto';

@Expose()
export class PaginationCentroDTO  {
    
    @ApiProperty()
    @IsInt()
    public centros: CreateCentroDTO[];
    
    @ApiProperty()
    @IsInt()
    public total: number;
}
