import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserSearchResponseDto } from "./dto/response.dto";
import { UserQuerySearchDto, UserSearchDto } from "./dto/search.dto";
import { SearchQuery } from "../../common/decorators/src/search-query.decorator";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly service: UserService) {}

    @ApiOperation({ summary: "Поиск" })
    @ApiOkResponse({ type: UserSearchResponseDto })
    @ApiQuery({ type: UserQuerySearchDto })
    @Get("search")
    async search(@SearchQuery(UserSearchDto, UserQuerySearchDto) dto: UserSearchDto): Promise<UserSearchResponseDto> {
        return this.service.search(dto);
    }
}
