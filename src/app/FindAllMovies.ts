import { Service } from 'typedi';
import { MovieRepository } from '../infra/database/repository/MovieRepository';

@Service()
export class FindAllMovies {
  constructor(private readonly repo: MovieRepository) {}

  async execute(filters: any) {
    return this.repo.findAll(filters);
  }
}
