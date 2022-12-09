const password = process.env.PASSWORD_MONGO_URL;
const usernameNeo = process.env.USERNAME_NEO;
const passwordNeo = process.env.PASSWORD_NEO;

export const environment = {
  production: true,
  BASE_MONGO_URL: `mongodb://Gustave:${password}@ac-ldb5hca-shard-00-00.m6gvewv.mongodb.net:27017,ac-ldb5hca-shard-00-01.m6gvewv.mongodb.net:27017,ac-ldb5hca-shard-00-02.m6gvewv.mongodb.net:27017/?ssl=true&replicaSet=atlas-jaynf6-shard-0&authSource=admin&retryWrites=true&w=majority`,
  BASE_NEO_HOST: '44.199.235.138',
  USERNAME_NEO: usernameNeo,
  PASSWORD_NEO: passwordNeo
};
