import request from 'supertest';
import path from 'path';
import app from '../../src/server';
import { initializeAppWithCsv } from '../helpers/initTestApp';

describe('Movies API Integration', () => {
  beforeAll(async () => {
    await initializeAppWithCsv(
      path.resolve(__dirname, '../../in/movielist.csv')
    );
  });

  it('deve retornar exatamente 206 filmes do CSV', async () => {
    const res = await request(app).get('/api/v1/movies');
    expect(res.status).toBe(200);
    expect(res.body.movies).toBeInstanceOf(Array);
    expect(res.body.movies.length).toBe(206);
    expect(res.body.total).toBe(206);
  });

  it('deve conter os campos obrigatórios em cada filme', async () => {
    const res = await request(app).get('/api/v1/movies');
    const movie = res.body.movies[0];
    expect(movie).toHaveProperty('year');
    expect(movie).toHaveProperty('title');
    expect(movie).toHaveProperty('studios');
    expect(movie).toHaveProperty('producers');
    expect(movie).toHaveProperty('winner');
  });

  it('deve conter como primeiro filme "Can\'t Stop the Music"', async () => {
    const res = await request(app).get('/api/v1/movies');
    const first = res.body.movies[0];
    expect(first.year).toBe(1980);
    expect(first.title).toBe("Can't Stop the Music");
  });

  it('deve retornar exatamente 42 filmes vencedores', async () => {
    const res = await request(app).get('/api/v1/movies?winner=true');
    expect(res.status).toBe(200);
    expect(res.body.movies.length).toBe(42);
    expect(res.body.movies.every((movie: any) => movie.winner === true)).toBe(
      true
    );
  });

  it('deve retornar produtores com menor e maior intervalo corretamente', async () => {
    const res = await request(app).get(
      '/api/v1/movies/producers-winners-intervals'
    );
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');

    expect(Array.isArray(res.body.min)).toBe(true);
    expect(Array.isArray(res.body.max)).toBe(true);

    const min = res.body.min[0];
    expect(min).toHaveProperty('producer');
    expect(min).toHaveProperty('interval');
    expect(min).toHaveProperty('previousWin');
    expect(min).toHaveProperty('followingWin');

    expect(res.body.min).toEqual([
      {
        producer: 'Joel Silver',
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      },
    ]);

    expect(res.body.max).toEqual([
      {
        producer: 'Matthew Vaughn',
        interval: 13,
        previousWin: 2002,
        followingWin: 2015,
      },
    ]);
  });
});
