import { PickType } from "@nestjs/swagger";
import { GuiaDTO } from "./Guia.DTO";

export class CreateGuiaDTO extends GuiaDTO {
    readonly tipoPorArticulo: string;
    
    readonly id: number;
}
