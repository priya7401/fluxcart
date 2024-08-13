import dotenv from 'dotenv';

dotenv.config();

export const AppConstants = {
  nodeEnv: process.env.NODE_ENV,
  apiPort: Number(process.env.PORT),
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: Number(process.env.POSTGRES_PORT),
  postgresUsername: process.env.POSTGRES_USERNAME,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDB: process.env.POSTGRES_DATABASE,
};

export enum LinkPrecedence {
  primary = "primary",
  secondary = "secondary",
}