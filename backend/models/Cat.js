const modelName = 'Cat';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const types = Schema.types;

// Schema
let schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true }
});

// Create a model
let model = mongoose.model(modelName, schema);

// Export
module.exports = model;