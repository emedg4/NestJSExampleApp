import { ApiProperty } from "@nestjs/swagger";
import { ArticuloDTO } from "./Articulo.DTO";
import { ClienteDTO } from "./Cliente.DTO";
import { EntregaDTO } from "./Entrega.DTO";
import { MovimientoDTO } from "./Movimiento.DTO";
import { PedidoDTO } from "./Pedido.DTO";

export class TrackingResponseDetalleDTO {
    @ApiProperty()
    public guia: string;

    @ApiProperty()
    public paquetera: string;

    @ApiProperty()
    public link_rastreo: string;

    @ApiProperty()
    public fecha_promesa: string;

    @ApiProperty()
    public num_orden: string;

    @ApiProperty()
    public remision: number;

    @ApiProperty()
    public cliente: ClienteDTO;

    @ApiProperty()
    public entrega: EntregaDTO;

    @ApiProperty()
    public pedido: PedidoDTO;

    @ApiProperty()
    public articulos: ArticuloDTO

    @ApiProperty()
    public movimientos: MovimientoDTO[]

    @ApiProperty()
    public tipo: string;

    @ApiProperty()
    public entrega_en: string;
}