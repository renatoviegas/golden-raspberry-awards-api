import path from 'path';
import { Application } from './Application';

const DEFAULT_CSV_PATH = path.resolve(__dirname, '../in/movielist.csv');

const csvPath = process.argv[2] || DEFAULT_CSV_PATH;

if (!csvPath) {
  console.error('Erro: Caminho do arquivo CSV não informado!');
  process.exit(1);
}

const app = new Application(csvPath);

app.initialize().catch((error: any) => {
  console.error(error.stack);
  process.exit(1);
});
