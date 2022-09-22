import { ApiProperty } from "@nestjs/swagger";
import { DataDTO } from "./Data.DTO";
import { MetaDTO } from "./Meta.DTO";

export class TrackingResponseDTO {

    @ApiProperty()
    readonly meta: MetaDTO;

    @ApiProperty()
    readonly data: DataDTO;
}