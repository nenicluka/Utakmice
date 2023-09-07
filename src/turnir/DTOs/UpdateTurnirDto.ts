import { PartialType } from "@nestjs/mapped-types";
import { CreateTurnirDto } from "./CreateTurnirDto";

export class UpdateTurnirDto extends PartialType(CreateTurnirDto) { }