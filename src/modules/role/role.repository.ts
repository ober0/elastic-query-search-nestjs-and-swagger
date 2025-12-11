import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RoleRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getAll(query?: string) {
        return this.prisma.role.findMany({
            where: query
                ? {
                      name: {
                          contains: query,
                          mode: "insensitive"
                      }
                  }
                : undefined
        });
    }
}
