import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
    @IsNumber()
    @IsOptional()
    @Min(0)
    limit: number = 10;
    @IsNumber()
    @IsOptional()
    @Max(50)
    page: number = 0;
}