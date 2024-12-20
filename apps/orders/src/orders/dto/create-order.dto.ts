import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsArray()
    @IsNumber({ allowNaN: false }, { each: true })
    ids: number[]
}
