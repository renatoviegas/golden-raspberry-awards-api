# Golden Raspberry Awards API

API RESTful para leitura dos indicados e vencedores da categoria **Pior Filme** do *Golden Raspberry Awards*.

Implementada em **Node.js** + **TypeScript** + **Express** + **TypeORM** (banco em memória), **arquitetura hexagonal** e **testes de integração**.

---

## Requisitos

- Node.js **versão 18+** (recomendado 18, 20 ou superior)
- npm

---

## Como rodar o projeto

1. **Clone o repositório**
    ```sh
    git clone https://github.com/renatoviegas/golden-raspberry-awards-api.git
    cd golden-raspberry-awards-api
    ```

2. **Instale as dependências**
    ```sh
    npm install
    ```

3. **Prepare o arquivo CSV**
    - O arquivo dos filmes deve estar no formato especificado (exemplo: `movielist.csv`).
    - Um exemplo está disponível na pasta `/in/Movielist.csv`.

4. **(Opcional) Configure variáveis de ambiente**
    - Crie um arquivo `.env` para configurar a porta:
        ```
        PORT=3000
        ```

5. **Rode a aplicação**
    - Para ambiente de produção (após build):
        ```sh
        npm run build
        node dist/start.js in/Movielist.csv
        ```
    - Ou para desenvolvimento com ts-node:
        ```sh
        npx ts-node src/start.ts in/Movielist.csv
        ```

---

## Como rodar os testes de integração

> Os testes de integração garantem que os endpoints da API funcionam corretamente e retornam os dados esperados, usando um banco de dados em memória e um arquivo CSV de mock.

1. **Execute todos os testes:**
    ```sh
    npm test
    ```

2. **Veja a cobertura dos testes:**
    ```sh
    npm run test:coverage
    ```

- Não é necessário subir o servidor manualmente para rodar os testes, pois eles importam e inicializam a aplicação automaticamente com um CSV de teste.

---

## Endpoints disponíveis

- `GET /api/v1/movies`
    - Lista filmes (filtros: `year`, `producer`, `winner`, etc)
- `GET /api/v1/movies/producers-winners-intervals`
    - Retorna o(s) produtor(es) com maior e menor intervalo entre as premiações

---

## Exemplos de uso

```sh
curl 'http://localhost:3000/api/v1/movies'
curl 'http://localhost:3000/api/v1/movies?winner=true'
curl 'http://localhost:3000/api/v1/movies/producers-winners-intervals'
```

## Considerações finais

- **Banco de dados em memória:** Utiliza SQLite via TypeORM, sem dependências externas. Os dados vêm do CSV, tornando testes e reset do ambiente simples.
- **Arquitetura hexagonal:** Camadas separadas facilitam manutenção, testes e futuras trocas de tecnologia.
- **Testes de integração autônomos:** Testes rodam isolados, com dados mock e sem necessidade de servidor manual.
- **Cobertura de requisitos:** API cobre todos os requisitos do desafio, incluindo análise dos intervalos de produtores vencedores.
- **Pronto para expansão:** Código modular e preparado para novos filtros, endpoints ou integrações.
- **Boas práticas:** Código limpo, injeção de dependências, tratamento de erros e validação de entrada.
