const modelName = 'Arena';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema ({
    name: {type: String, required: true},
    long: {type: String, required: true},
    lat: {type: String, required: true},
    capacity: {type: Number, required: true},
    homeTeam: String
});

let model = mongoose.model(modelName, schema);

module.exports = model;