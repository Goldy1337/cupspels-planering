const dbName = 'cupdb'
const { mongoose, express, app } = require('mongoosy')({
  // settings for mongoosy
  connect: {
    url: 'mongodb://localhost/' + dbName
  }
});

app.listen(3001, () => console.log('API server listening on port 3001'));
