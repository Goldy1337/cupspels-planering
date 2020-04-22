const modelName = 'CupPreset';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema({
    cupType: { type: String, required: true },
    matchLength: { type: Number, required: true },
    playersOnField: { type: Number, required: true }
});

let model = mongoose.model(modelName, schema);

module.exports = model;