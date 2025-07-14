import Container from 'typedi';
import dotenv from 'dotenv';
import { initializeDatabase } from './infra/database/DatabaseProvider';
import { LoadAndRegisterMovies } from './app/LoadAndRegisterMovies';
import { initializeServer } from './server';

export class Application {
  constructor(private csvPath: string, private port: number = 3000) {}

  public async initialize() {
    this.loadEnvironment();
    await initializeDatabase();
    await this.loadAndRegisterMovies();
    initializeServer(this.port);
  }

  private loadAndRegisterMovies() {
    const loadAndRegisterMoviesUseCase = Container.get(LoadAndRegisterMovies);
    return loadAndRegisterMoviesUseCase.execute(this.csvPath);
  }

  private loadEnvironment() {
    dotenv.config();

    if (process.env.PORT) {
      const parsed = parseInt(process.env.PORT, 10);

      if (isNaN(parsed) || parsed <= 0) {
        throw new Error(
          `Valor '${process.env.PORT}' informado em PORT não é válido!`
        );
      }

      this.port = parsed;
    }
  }
}
