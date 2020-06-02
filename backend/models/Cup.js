const modelName = 'Cup';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;


let schema = new Schema ({
    presetId: {type: Types.ObjectId, ref: 'CupPreset'},
    name: {type: String, required: true},
    organizer: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    teams: [{type: Types.ObjectId, ref: 'Team'}]
});

let model = mongoose.model(modelName, schema);

module.exports = model;