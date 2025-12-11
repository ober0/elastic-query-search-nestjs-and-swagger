import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { LoggerMiddleware } from "../../common/middlewares/logger.middleware";
import { UserModule } from "../user/user.module";
import { RoleModule } from "../role/role.module";

@Module({
    imports: [PrismaModule, UserModule, RoleModule]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*path");
    }
}
