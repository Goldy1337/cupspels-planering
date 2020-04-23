const modelName = 'Referee';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema({
  name: { type: String, required: true }
});

let model = mongoose.model(modelName, schema);

module.exports = model;