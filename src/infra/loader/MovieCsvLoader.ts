import { Movie } from '../../domain/Movie';

export interface MovieCsvLoader {
  loadMoviesFromCSV(csvPath: string): Promise<Movie[]>;
}
