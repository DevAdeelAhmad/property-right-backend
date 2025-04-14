import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesModule } from './properties/properties.module';
import { HealthModule } from './health/health.module';
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
      synchronize: false, // Important: keep this false for production
      migrationsRun: true, // Run migrations automatically on startup
    }),
    PropertiesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
