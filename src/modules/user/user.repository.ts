import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserInclude } from "./consts/include";
import { UserSearchDto } from "./dto/search.dto";
import { mapSearch } from "../../common/tools/src/map.search";
import { mapSort } from "../../common/tools/src/map.sort";
import { mapPagination } from "../../common/tools/src/map.pagination";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async search(dto: UserSearchDto) {
        return this.prisma.user.findMany({
            where: mapSearch(dto.filters, [], [], dto.query, ["username", "firstName", "lastName"]),
            orderBy: mapSort(dto.sorts, []),
            ...mapPagination(dto.pagination),
            ...UserInclude
        });
    }

    async count(dto: UserSearchDto) {
        return this.prisma.user.count({
            where: mapSearch(dto.filters, [], [], dto.query, ["username", "firstName", "lastName"])
        });
    }
}
