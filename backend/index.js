// Start a web server
const express = require('express');
// create a server
const app = express();
// make the server able to read request.body
app.use(express.json());
// start the server
app.listen(3001, () => console.log('API server listening on port 3001'));

// connect to mongoDB via mongoose
const mongoose = require('mongoose');
let dbName = 'cupdb'

mongoose.connect('mongodb://localhost:27017/' + dbName, { useNewUrlParser: true, useUnifiedTopology: true });

// Import mongoose models
let models = [
  'Cup',
  'CupPreset',
  'Arena',
  'Field',
  'Match',
  'Team',
  'Participant',
  'Referee',
  'Account',
  'Admin',
  'Cup'
].map(x => require('./models/' + x));

// Create rest routes
for (let model of models) {
  let route = '/api/' + model.collection.collectionName;

  app.get(route, async (req, res) => {
    res.json(await model.find());
  });

  app.get(route + '/:id', async (req, res) => {
    res.json(await model.findOne({ _id: req.params.id }));
  });

  app.post(route, async (req, res) => {
    let instance = new model(req.body);
    res.json(await instance.save());
  });

  app.put(route + '/:id', async (req, res) => {
    let instance = await model.findOne({ _id: req.params.id });
    if (!instance) {
      res.json({ error: 'Not found' });
      return;
    }
    Object.assign(instance, req.body);
    res.json(await instance.save());
  });

  app.delete(route + '/:id', async (req, res) => {
    res.json(await model.findByIdAndRemove(req.params.id));
  });
}