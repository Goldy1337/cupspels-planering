const modelName = 'Match';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema ({
    result: {type: String, required: true},
    match_type: {type: String, required: true},
    date: {type: String, required: true},
    start_time: {type: String, required: true},
    predicted_end_time: {type: String, required: true},
    active_team_size: {type: Number, required: true}
});

let model = mongoose.model(modelName, schema);

module.exports = model;