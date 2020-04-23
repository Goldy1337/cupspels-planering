const modelName = 'Match';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema ({
    fieldId: {type: Types.ObjectId, ref: 'Field'},
    result: {type: String, required: true},
    matchType: {type: String, required: true},
    date: {type: Date, required: true},
    startTime: {type: Date, required: true},
    duration: {type: Number, required: true},
    activeTeamSize: {type: Number, required: true}
});

let model = mongoose.model(modelName, schema);

module.exports = model;