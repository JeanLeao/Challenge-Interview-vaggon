import { Sequelize } from "sequelize";

export const connection = new Sequelize('railway', 'root', 'gCR49gmkHBT9Q3syEPQI', {
    host: 'containers-us-west-79.railway.app',
    port: 6214,
    dialect: 'mysql',
  });


