import { ApiProperty } from "@nestjs/swagger";
import { RemisionDTO } from "./Remision.DTO";

export class PedidoDTO {

    @ApiProperty()
    readonly remision: RemisionDTO;

    @ApiProperty()
    readonly hora: string;

    @ApiProperty()
    readonly subtotal: number;

    @ApiProperty()
    readonly num_orden: string;

    @ApiProperty()
    readonly num_pedido: number;

    @ApiProperty()
    readonly forma_de_pago: string;

    @ApiProperty()
    readonly fecha_pedido: string;
}