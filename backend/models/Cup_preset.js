const modelName = 'Cup_preset';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema ({
    cup_type: {type: String, required: true},
    match_lenght: {type: Number, required: true},
    players_on_field: {type: Number, required: true}
});

let model = mongoose.model(modelName, schema);

module.exports = model;