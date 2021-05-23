const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const router = require('./api');

// Static Files
app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`app is listening at port ${port}!`);
});

app.use('/api', router);
