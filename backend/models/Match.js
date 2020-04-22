const modelName = 'Match';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema ({
    result: {type: String, required: true},
    matchType: {type: String, required: true},
    date: {type: String, required: true},
    startTime: {type: String, required: true},
    predictedEndTime: {type: String, required: true},
    activeTeamSize: {type: Number, required: true}
});

let model = mongoose.model(modelName, schema);

module.exports = model;