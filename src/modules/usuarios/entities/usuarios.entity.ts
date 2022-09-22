import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'cat_usuarios'})
export class Usuario {
  @PrimaryGeneratedColumn()
  idu_usuario: number;

  @Index("ix_cat_usuarios_consulta")
  @Column({nullable: false})
  @ApiProperty()
  nom_correo: string;
}