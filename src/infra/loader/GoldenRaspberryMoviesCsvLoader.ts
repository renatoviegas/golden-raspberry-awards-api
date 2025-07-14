import fs from 'fs';
import csv from 'csv-parser';
import { Movie } from '../../domain/Movie';
import { MovieCsvLoader } from './MovieCsvLoader';
import { finished } from 'stream/promises';
import { Service } from 'typedi';

@Service()
export class GoldenRaspberryMoviesCsvLoader implements MovieCsvLoader {
  async loadMoviesFromCSV(csvPath: string): Promise<Movie[]> {
    if (!fs.existsSync(csvPath)) {
      throw new Error(`Arquivo CSV não encontrado: ${csvPath}`);
    }

    const movies: Movie[] = [];
    const stream = fs.createReadStream(csvPath).pipe(csv({ separator: ';' }));

    stream.on('data', (row) => {
      const isWinner = (row.winner || '').trim().toLowerCase() === 'yes';

      movies.push(
        new Movie(
          Number(row.year),
          row.title,
          row.studios,
          row.producers,
          isWinner
        )
      );
    });

    await finished(stream);

    if (movies.length === 0) {
      throw new Error('Nenhum filme encontrado no arquivo CSV.');
    }

    return movies;
  }
}
