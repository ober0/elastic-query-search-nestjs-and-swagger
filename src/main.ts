import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const name: string = "elastic search nestjs";

    app.set("trust proxy", true);
    app.setGlobalPrefix("api");

    app.enableCors({
        origin: true,
        credentials: true
    });

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true
        })
    );

    const port = process.env.PORT || 3000;

    const config = new DocumentBuilder()
        .setTitle(`${name} API Documentation`)
        .setDescription(`Документация для API ${name}`)
        .setVersion("1.0.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document, { customSiteTitle: name });

    await app.listen(port);
}

bootstrap();
