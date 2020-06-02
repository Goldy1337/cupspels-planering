const modelName = 'Field';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema ({
    arenaId: {type: Types.ObjectId, ref: 'Arena'},
    name: {type: String, required: true},
    size: {type: String, required: true},
    surface: {type: String},
    outdoors: {type: String, required: true}
});

let model = mongoose.model(modelName, schema);

module.exports = model;