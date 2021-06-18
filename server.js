// Dependencies //
const express = require('express');
const sequelize = require ('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./controllers'));

// sync db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`===========================\nNow listening on port: ${PORT}\n===========================`))
});