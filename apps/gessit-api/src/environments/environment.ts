const password = process.env.PASSWORD_MONGO_URL;

export const environment = {
  production: false,
  BASE_MONGO_URL: `mongodb+srv://Gustave:${{ password }}@gessit-cluster.m6gvewv.mongodb.net/?retryWrites=true&w=majority`,
  BASE_NEO_HOST: '44.199.235.138'
};
