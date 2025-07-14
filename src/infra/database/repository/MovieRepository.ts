import { AppDataSource } from '../DatabaseProvider';
import { MovieEntity } from '../entity/MovieEntity';
import { Movie } from '../../../domain/Movie';
import { MovieMapper } from '../mapper/MovieMapper';
import { MovieFilters } from '../../../domain/MovieFilters';
import { Service } from 'typedi';
import { FindOptionsWhere } from 'typeorm';
import {
  numberValue,
  stringValue,
  booleanValue,
  removeUndefinedKeys,
} from '../../../shared/helpers';

@Service()
export class MovieRepository {
  private repo = AppDataSource.getRepository(MovieEntity);

  async add(movie: Movie): Promise<void> {
    const entity = MovieMapper.toEntity(movie);
    await this.repo.save(entity);
  }

  async addMany(movies: Movie[]): Promise<void> {
    const entities = MovieMapper.toEntityMany(movies);
    await this.repo.save(entities);
  }

  async findAll(filters?: MovieFilters): Promise<Movie[]> {
    let whereOptions: Record<string, any> = {
      year: numberValue(filters?.year),
      title: stringValue(filters?.title),
      studios: stringValue(filters?.studio),
      producers: stringValue(filters?.producer),
      winner: booleanValue(filters?.winner),
    };

    whereOptions = removeUndefinedKeys(whereOptions);

    const entities = await this.repo.find({ where: whereOptions });
    return MovieMapper.toDomainMany(entities);
  }

  async findWinners(): Promise<Movie[]> {
    const entities = await this.repo.find({ where: { winner: true } });
    return MovieMapper.toDomainMany(entities);
  }
}
