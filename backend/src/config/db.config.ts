import { Sequelize } from "sequelize-typescript";

import { User } from "../model/user.model";

const hostName = process.env.HOST;
const userName = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DB;
const dialect: any = process.env.DIALECT;

const connection = new Sequelize({
  dialect: dialect,
  host: hostName,
  username: userName,
  password: password,
  database: database,
  logging: false,
  models: [User],
});

export default connection;