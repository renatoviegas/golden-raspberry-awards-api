import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [__dirname + '/entity/*.{ts,js}'],
  synchronize: true,
  logging: false,
});

export async function initializeDatabase() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}
