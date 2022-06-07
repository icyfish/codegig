const { Sequelize } = require("sequelize");

module.exports = new Sequelize("codegig", "postgres", "123456", {
  host: "localhost",
  dialect: "postgres",
  port: 5433,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
