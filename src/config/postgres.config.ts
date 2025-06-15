import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const postgresConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const config = {
    type: 'postgres',
    host: configService.get('config.postgres.host'),
    port: configService.get('config.postgres.port'),
    username: configService.get('config.postgres.username'),
    password: configService.get('config.postgres.password'),
    database: configService.get('config.postgres.database'),
    autoLoadEntities: true,
    synchronize: true,
     ssl: {
    rejectUnauthorized: false, // For RDS, okay for dev; use CA bundle in prod
  }
  };

  console.log('Postgres config:', config); // <-- This will log your config

  return config as TypeOrmModuleOptions;
};