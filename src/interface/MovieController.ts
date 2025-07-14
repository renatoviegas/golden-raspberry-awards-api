import { Request, Response } from 'express';
import { Service } from 'typedi';
import { HttpStatus } from './HttpStatus';
import { FindAllMovies } from '../app/FindAllMovies';
import { CalculateProducersAwardIntervals } from '../app/CalculateProducersAwardIntervals';
import { MovieResponseMapper } from './MovieResponseMapper';

@Service()
export class MovieController {
  constructor(
    private readonly findAllMovies: FindAllMovies,
    private readonly calculateProducersAwardIntervals: CalculateProducersAwardIntervals
  ) {}

  public retrieveAll = async (req: Request, res: Response) => {
    try {
      const filters = {
        year: req.query.year,
        title: req.query.title,
        studio: req.query.studio,
        producer: req.query.producer,
        winner: req.query.winner,
      };

      const data = await this.findAllMovies.execute(filters);

      const mappedData = MovieResponseMapper.toResponse(data);

      res.status(HttpStatus.OK).json({
        movies: mappedData,
        total: mappedData.length,
      });
    } catch (error: any) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message || 'Erro interno ao buscar filmes' });
    }
  };

  public getProducersAwardIntervals = async (req: Request, res: Response) => {
    try {
      const data = await this.calculateProducersAwardIntervals.execute();

      res.status(HttpStatus.OK).json(data);
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error:
          error.message || 'Erro interno ao buscar os intervalos de vencedores',
      });
    }
  };
}
