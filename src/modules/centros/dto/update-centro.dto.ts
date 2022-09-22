import { PickType } from "@nestjs/swagger";
import { CreateCentroDTO } from "./create-centro.dto";

// Devuelve una copia CreateCentroDTO considerando solo la propiedad num_centro y opt_centro
export class UpdateCentroDTO extends PickType(CreateCentroDTO, ['num_centro' , 'opt_centro'] as const) {}
