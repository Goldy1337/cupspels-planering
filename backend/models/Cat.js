const modelName = 'Cat';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

// Schema
let schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  // this is how to declare foreign keys
  // ownerId: { type: Types.ObjectId, ref: 'Owner'}
});

// Create a model
let model = mongoose.model(modelName, schema);

// Export
module.exports = model;