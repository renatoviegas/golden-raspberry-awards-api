import express, { json } from 'express';
import movieRoutes from './interface/MovieRoutes';

const app = express();
app.use(json());

app.use(movieRoutes);
app.get('/ok', (req, res) => res.json({ status: 'ok' }));

export function initializeServer(port: number) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
