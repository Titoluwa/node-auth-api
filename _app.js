// app.js
const dotenv = require('dotenv').config();
const express = require('express');
const Routes = require('./routes/_main');
const sequelize = require('./_sequelize');

require('./models/user');

const app = express();
const port = process.env.APP_PORT || 8000;

app.use(express.json());

Routes(app);


sequelize.sync({ force: false }) // Set force to true to drop tables and re-create them
  .then(() => {
    console.log('Database synced successfully');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
    // Start your server or perform other tasks here
  })
  .catch(err => {
    console.error('Error syncing database:', err);
});