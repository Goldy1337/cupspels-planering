const modelName = "Address";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema({
  address: {type: String, required: true},
  // streetName: { type: String, required: true },
  // streetNumber: { type: Number, required: false },
  postCode: { type: Number, required: false },
  city: { type: String, required: true },
  country: { type: String, required: true },
  coordinates: { type: Array, required: true}
});

let model = mongoose.model(modelName, schema);

module.exports = model;
