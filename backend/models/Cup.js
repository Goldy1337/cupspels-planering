const modelName = 'Cup';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;


let schema = new Schema ({
    name: {type: String, required: true},
    organizer: {type: String, required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    cupPresetId: {type: Types.ObjectId, ref: 'cup_type'}
});

let model = mongoose.model(modelName, schema);

module.exports = model;