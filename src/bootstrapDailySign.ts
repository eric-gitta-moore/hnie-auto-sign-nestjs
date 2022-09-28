import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IndexService } from './index/service/impl/index.service';
import { IndexModule } from './index/index.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.select(IndexModule).get(IndexService, { strict: true }).dailySign();
  await app.close();
}
bootstrap();
