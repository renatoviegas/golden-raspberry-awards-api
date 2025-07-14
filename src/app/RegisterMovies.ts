import { Service } from 'typedi';
import { Movie } from '../domain/Movie';
import { MovieRepository } from '../infra/database/repository/MovieRepository';

@Service()
export class RegisterMovies {
  constructor(private readonly repo: MovieRepository) {}

  async execute(movies: Movie[]): Promise<void> {
    await this.repo.addMany(movies);
  }
}
