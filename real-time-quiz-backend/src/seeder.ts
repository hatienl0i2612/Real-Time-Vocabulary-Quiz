import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seederService = app.get(SeederService);

  try {
    await seederService.seed();
  } catch (error) {
    console.error('Failed to seed data', error);
  } finally {
    await app.close();
  }
}

bootstrap();
