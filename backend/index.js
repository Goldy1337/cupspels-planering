const express = require('express');
// create a server
const app = express();
// start the server
app.listen(3001, () => console.log('API server listening on port 3001'));

app.get('/api/test', (req, res) => {
  res.json({ hello: 'Hello world!' });
});
