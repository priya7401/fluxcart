import { DataSource } from 'typeorm';
import { AppConstants } from '../config/appConstants';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: AppConstants.postgresHost,
  port: AppConstants.postgresPort,
  username: AppConstants.postgresUsername,
  password: AppConstants.postgresPassword,
  database: AppConstants.postgresDB,
  synchronize: false,
  logging: true,
  entities: [
    AppConstants.nodeEnv === "dev"
      ? "src/database/entity/**/*.ts"
      : "build/database/entity/**/*.js",
  ],
  subscribers: [],
  migrations: [
    AppConstants.nodeEnv === "dev"
      ? "src/database/migrations/**/*.ts"
      : "build/database/migrations/**/*.js",
  ],
});

export const connectDB = () =>
  AppDataSource.initialize()
    .then(() => {
      console.log('======= initialized postgres DB and running on port: ', AppConstants.postgresPort);
      // here you can start to work with your database
    })
    .catch((error) => console.log('======= error initializing postgres DB on port: ', error));
