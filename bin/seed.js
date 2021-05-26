const { db, Concert, Genre } = require('../server/db');

const init = async () => {
  try {
    await db.sync({ force: true });
    console.log('connected');
  } catch (error) {
    console.log(error);
  }
};

init();
