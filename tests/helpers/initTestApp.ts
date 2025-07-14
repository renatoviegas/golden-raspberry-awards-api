import { initializeDatabase } from '../../src/infra/database/DatabaseProvider';
import { Container } from 'typedi';
import { LoadAndRegisterMovies } from '../../src/app/LoadAndRegisterMovies';

export async function initializeAppWithCsv(csvPath: string) {
  await initializeDatabase();
  const loadAndRegisterMovies = Container.get(LoadAndRegisterMovies);
  await loadAndRegisterMovies.execute(csvPath);
}
