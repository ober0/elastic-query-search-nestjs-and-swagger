import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";
import { RoleResponseDto } from "./dto/response.dto";

@Controller("role")
@ApiTags("Role")
export class RoleController {
    constructor(private readonly service: RoleService) {}

    @Get()
    @ApiOkResponse({ type: RoleResponseDto, isArray: true })
    @ApiOperation({ summary: "Поиск ролей" })
    @ApiQuery({
        name: "query",
        required: false,
        type: String,
        description: "Поиск"
    })
    async getAll(@Query("query") query?: string): Promise<RoleResponseDto[]> {
        return this.service.getAll(query);
    }
}
