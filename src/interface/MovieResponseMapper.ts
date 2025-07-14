import { Movie } from '../domain/Movie';

export class MovieResponseMapper {
  static toResponse(movies: Movie[]) {
    return movies.map((movie) => ({
      id: movie.id,
      year: movie.year,
      title: movie.title,
      studios: movie.studios,
      producers: movie.producers,
      winner: movie.winner,
    }));
  }
}
