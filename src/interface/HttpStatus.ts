export enum HttpStatus {
  // Sucesso 2xx
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  // Erro no Cliente 4xx
  BAD_REQUEST = 400,
  NOT_FOUND = 404,

  // Erro no Server 5xx
  INTERNAL_SERVER_ERROR = 500,
}
