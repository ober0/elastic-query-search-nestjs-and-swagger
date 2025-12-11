import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserSearchDto } from "./dto/search.dto";
import { RoleService } from "../role/role.service";

@Injectable()
export class UserService {
    constructor(private readonly repository: UserRepository) {}

    async search(dto: UserSearchDto) {
        const [data, count] = await Promise.all([this.repository.search(dto), this.repository.count(dto)]);

        return {
            data,
            count
        };
    }
}
