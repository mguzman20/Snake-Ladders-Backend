const dotenv = require('dotenv');
const { app, server } = require('./app');
const db = require('./models');

dotenv.config();

const PORT = process.env.APP_PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    server.listen(PORT, (err) => {
      if (err) {
        return console.error('Failed', err);
      }
      console.log(`Listening on port ${PORT}`);
      return app;
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
