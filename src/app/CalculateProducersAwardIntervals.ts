import { Service } from 'typedi';
import { MovieRepository } from '../infra/database/repository/MovieRepository';
import { Movie } from '../domain/Movie';

interface IntervalDTO {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

interface IntervalsResponse {
  min: IntervalDTO[];
  max: IntervalDTO[];
}

const SEPARATOR_PRODUCERS_REGEX = /,| and /;

@Service()
export class CalculateProducersAwardIntervals {
  constructor(private readonly movieRepository: MovieRepository) {}

  public async execute(): Promise<IntervalsResponse> {
    const winners = await this.movieRepository.findAll({ winner: true });

    const producerWins = this.mapProducerWins(winners);

    return this.calculateIntervals(producerWins);
  }

  private mapProducerWins(movies: Movie[]): Record<string, number[]> {
    const producerWins: Record<string, number[]> = {};

    movies.forEach((movie) => {
      movie.producers
        .split(SEPARATOR_PRODUCERS_REGEX)
        .map((p) => p.trim())
        .forEach((producer) => {
          if (!producerWins[producer]) producerWins[producer] = [];
          producerWins[producer].push(movie.year);
        });
    });

    return producerWins;
  }

  private calculateIntervals(
    producerWins: Record<string, number[]>
  ): IntervalsResponse {
    const intervals: IntervalDTO[] = [];

    Object.entries(producerWins).forEach(([producer, years]) => {
      if (years.length < 2) return;
      const sorted = years.sort((a, b) => a - b);
      for (let i = 1; i < sorted.length; i++) {
        intervals.push({
          producer,
          interval: sorted[i] - sorted[i - 1],
          previousWin: sorted[i - 1],
          followingWin: sorted[i],
        });
      }
    });

    if (intervals.length === 0) return { min: [], max: [] };

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === minInterval),
      max: intervals.filter((i) => i.interval === maxInterval),
    };
  }
}
