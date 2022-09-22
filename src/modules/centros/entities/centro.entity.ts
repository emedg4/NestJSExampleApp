import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { Exclude , Expose} from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

@Expose()
@Entity({name: 'cat_centros'})
export class Centro {

    @Exclude()
    @PrimaryGeneratedColumn()
    public idu_centro: number;

    @Index('ix_cat_centros_consulta')
    @Column({ nullable: false })
    @ApiProperty()
    public num_centro: number;

    @Column({ nullable: false })
    @ApiProperty()
    public nom_centro: string;

    @Column({ nullable: false })
    @ApiProperty()
    public des_centro: string;

    @Exclude()
    @Column({ nullable: false })
    public opt_centro: boolean;
}
