import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { types } from 'pg';
import { initializeTransactionalContext } from 'typeorm-transactional';

// convert date from psql to string, because typeORM + pg driver auto convert UTC timezone
types.setTypeParser(1082, (val: string) => {
  return val;
});

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
