// config.js
module.exports = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION
    },
    // You can define configurations for other environments (e.g., production) as well
  };
  