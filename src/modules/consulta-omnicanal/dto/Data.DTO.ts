import { PedidoDTO } from './Pedido.DTO';
import { ClienteDTO } from './Cliente.DTO';
import { EntregaDTO } from './Entrega.DTO';
import { RastreoDTO } from './Rastreo.DTO';
import { ApiProperty } from '@nestjs/swagger';

export class DataDTO {

    @ApiProperty()
    public pedido: PedidoDTO;

    @ApiProperty()
    public cliente: ClienteDTO;

    @ApiProperty()
    public entrega: EntregaDTO;

    @ApiProperty()
    public rastreo: Array<RastreoDTO>;

}