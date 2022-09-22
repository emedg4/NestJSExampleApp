import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Expose()
@Entity({name: 'cat_menu'})
export class Menu {
  
  @Exclude()
  @PrimaryGeneratedColumn()
  idu_menu: number;

  @Column({nullable: false})
  @ApiProperty()
  nom_menu: string;

  @Column({nullable: false})
  @ApiProperty()
  des_menu: string;

  @Column({nullable: false})
  @ApiProperty()
  des_uri: string;

  @Column({nullable: false})
  @ApiProperty()
  des_favicon: string;

  @Exclude()
  @Index('ix_cat_menu_consulta')
  @Column({nullable: false})
  opt_is_admin: boolean;
}