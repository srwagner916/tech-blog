// Dependencies //
const express = require('express');
const sequelize = require ('./config/connection');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Secret secrets shhhh',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./controllers'));

// sync db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`===========================\nNow listening on port: ${PORT}\n===========================`))
});