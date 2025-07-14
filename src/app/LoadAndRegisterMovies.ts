import { Service } from 'typedi';
import { RegisterMovies } from './RegisterMovies';
import { GoldenRaspberryMoviesCsvLoader } from '../infra/loader/GoldenRaspberryMoviesCsvLoader';

@Service()
export class LoadAndRegisterMovies {
  constructor(
    private readonly loader: GoldenRaspberryMoviesCsvLoader,
    private readonly registerMovies: RegisterMovies
  ) {}

  async execute(csvPath: string): Promise<void> {
    const movies = await this.loader.loadMoviesFromCSV(csvPath);
    await this.registerMovies.execute(movies);
  }
}
