import { ApiProperty } from "@nestjs/swagger";

export class MetaDTO {

    @ApiProperty()
    readonly transactionID: string;

    @ApiProperty()
    readonly statusCode: number;

    @ApiProperty()
    readonly status: string;

    @ApiProperty()
    readonly timestamp: string;
}