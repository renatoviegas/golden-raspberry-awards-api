import request from 'supertest';
import path from 'path';
import app from '../../src/server';
import { initializeAppWithCsv } from '../helpers/initTestApp';

describe('Movies API Integration', () => {
  beforeAll(async () => {
    await initializeAppWithCsv(path.resolve(__dirname, 'data/Movielist.csv'));
  });

  it('deve retornar todos os filmes do CSV', async () => {
    const res = await request(app).get('/api/v1/movies');
    expect(res.status).toBe(200);
    expect(res.body.movies).toBeInstanceOf(Array);
    expect(res.body.total).toBe(206);
  });

  it('deve filtrar filmes vencedores', async () => {
    const res = await request(app).get('/api/v1/movies?winner=true');
    expect(res.status).toBe(200);
    expect(res.body.movies.every((movie: any) => movie.winner)).toBeTruthy();
  });

  it('deve retornar produtores com maior e menor intervalo', async () => {
    const res = await request(app).get(
      '/api/v1/movies/producers-winners-intervals'
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');
  });
});
