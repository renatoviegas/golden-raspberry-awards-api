import { Application } from './Application';

const csvPath = process.argv[2];

if (!csvPath) {
  console.error('Erro: Caminho do arquivo CSV não informado!');
  process.exit(1);
}

const app = new Application(csvPath);

app.initialize().catch((error: any) => {
  console.error(error.stack);
  process.exit(1);
});
