import { PartialType } from "@nestjs/mapped-types";
import { CreateTimDto } from "./CreateTimDto";

export class UpdateTimDto extends PartialType(CreateTimDto) { }