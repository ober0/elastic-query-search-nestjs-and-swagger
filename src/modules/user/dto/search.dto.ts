import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { GenerateSearchDto } from "../../../common/common-dto/src/base-search.dto";
import { GenerateQueryDto } from "../../../common/tools/src/generate-query.func";
import { SortTypes } from "../../../common/common-dto/src/sort-types.dto";
import { DateMinMaxFilterDto } from "../../../common/common-dto/src/min-max.filter.dto";

export class UserFiltersDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    secondName?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    telegram?: string;

    @ApiProperty()
    @IsOptional()
    @ValidateNested()
    @Type(() => DateMinMaxFilterDto)
    createdAt?: DateMinMaxFilterDto;

    @ApiPropertyOptional({
        type: [Number],
        example: [1]
    })
    @IsOptional()
    @IsNumber({}, { each: true })
    roleIds?: number[];
}

export class UserSortDto {
    @ApiProperty()
    @IsOptional()
    @IsEnum(SortTypes)
    createdAt?: SortTypes;

    @ApiProperty()
    @IsOptional()
    @IsEnum(SortTypes)
    username?: SortTypes;
}

export class UserSearchDto extends GenerateSearchDto(UserFiltersDto, UserSortDto) {}

export class UserQuerySearchDto extends GenerateQueryDto(UserFiltersDto) {}
