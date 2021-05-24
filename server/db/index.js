const { db } = require('./db');

const init = async () => {
  try {
    await db.sync({ force: true });
    console.log('connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { init };
