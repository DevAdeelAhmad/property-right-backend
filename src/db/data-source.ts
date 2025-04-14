import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
