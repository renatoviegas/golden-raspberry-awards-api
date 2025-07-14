import { Movie } from '../../../domain/Movie';
import { MovieEntity } from '../entity/MovieEntity';

export class MovieMapper {
  static toEntity(movie: Movie): MovieEntity {
    const entity = new MovieEntity();
    if (movie.id) entity.id = movie.id;
    entity.year = movie.year;
    entity.title = movie.title;
    entity.studios = movie.studios;
    entity.producers = movie.producers;
    entity.winner = movie.winner;
    return entity;
  }

  static toDomain(entity: MovieEntity): Movie {
    return new Movie(
      entity.year,
      entity.title,
      entity.studios,
      entity.producers,
      entity.winner,
      entity.id
    );
  }

  static toDomainMany(entities: MovieEntity[]): Movie[] {
    return entities.map((e) => this.toDomain(e));
  }

  static toEntityMany(movies: Movie[]): MovieEntity[] {
    return movies.map((m) => this.toEntity(m));
  }
}
