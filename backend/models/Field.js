const modelName = 'Field';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  surface: { type: String, required: true },
  outdoors: { type: Boolean, required: true }
});

let model = mongoose.model(modelName, schema);

module.exports = model;