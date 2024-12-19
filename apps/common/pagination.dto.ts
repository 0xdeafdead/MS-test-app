import { Transform } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(50)
    limit: number = 10;
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    @Min(0)
    page: number = 0;
}