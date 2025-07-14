import Container from 'typedi';
import { Router } from 'express';
import { MovieController } from './MovieController';

class MovieRoutes {
  private router: Router;
  private controller: MovieController;

  constructor() {
    this.router = Router();
    this.controller = Container.get(MovieController);
    this.loadRoutes();
  }

  private loadRoutes() {
    this.router.get('/api/v1/movies', this.controller.retrieveAll);
    this.router.get(
      '/api/v1/movies/producers-winners-intervals',
      this.controller.getProducersAwardIntervals
    );
    return this.router;
  }

  public getRoutes(): Router {
    return this.router;
  }
}

const movieRoutes = new MovieRoutes();
export default movieRoutes.getRoutes();
