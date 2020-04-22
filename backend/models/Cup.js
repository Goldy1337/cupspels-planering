const modelName = 'Cup';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;


let schema = new Schema ({
    name: {type: String, required: true},
    organizer: {type: String, required: true},
    start_date: {type: String, required: true},
    end_date: {type: String, required: true},
    cup_presetId: {type: Types.ObjectId, ref: 'cup_type'}
});

let model = mongoose.model(modelName, schema);

module.exports = model;