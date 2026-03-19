import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  // ── Static files (uploads) ────────────────────────────────────────────────
  const uploadsDir = join(process.cwd(), 'uploads');
  ['avatars', 'attachments'].forEach((sub) => {
    const dir = join(uploadsDir, sub);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  });
  app.useStaticAssets(uploadsDir, { prefix: '/uploads' });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3001;
  const apiPrefix = configService.get<string>('app.apiPrefix') || 'api/v1';
  const corsOrigins = configService.get<string[]>('app.corsOrigins') || ['http://localhost:3000'];

  // ── Global prefix ────────────────────────────────────────────────────────
  app.setGlobalPrefix(apiPrefix);

  // ── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-refresh-token'],
  });

  // ── Validation ────────────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── Swagger ───────────────────────────────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Prime Learning API')
    .setDescription('Apprenticeship Learning Management System — REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Server running on http://localhost:${port}/${apiPrefix}`);
  logger.log(`📚 Swagger docs at http://localhost:${port}/${apiPrefix}/docs`);
}

bootstrap();
