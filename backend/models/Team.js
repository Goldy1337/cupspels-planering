const modelName = 'Team';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema ({
    name: {type: String, required: true},
    gender: {type: String, required: true, enum:["Male", "Female", "Mixed", "N/A"]},
    age: {type: Number, required: true}
});

let model = mongoose.model(modelName, schema);

module.exports = model;