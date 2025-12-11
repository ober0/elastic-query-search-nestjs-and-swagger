import { Injectable } from "@nestjs/common";
import { RoleRepository } from "./role.repository";
import { RoleResponseDto } from "./dto/response.dto";

@Injectable()
export class RoleService {
    constructor(private readonly repository: RoleRepository) {}

    async getAll(query?: string): Promise<RoleResponseDto[]> {
        return this.repository.getAll(query);
    }
}
