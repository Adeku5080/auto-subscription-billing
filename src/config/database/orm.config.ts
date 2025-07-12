import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import databaseConfig from './database.config';
import { ConfigType } from '@nestjs/config';

export const ormConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const dbConfig =
    configService.get<ConfigType<typeof databaseConfig>>('database');
  const isProd = configService.get<string>('NODE_ENV') === 'production';
  return {
    type: 'mysql',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.name,
    autoLoadEntities: true,
    entities: [join(__dirname + '/../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname + '/migrations/**/*{.ts,.js}')],
    logging: !isProd,
  };
};
