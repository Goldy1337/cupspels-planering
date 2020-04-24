const modelName = 'Arena';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema ({
    addressId: {type: Types.ObjectId, ref: 'Address'},
    name: {type: String, required: true},
    capacity: {type: Number, required: true},
    homeTeam: {type: String}
});

let model = mongoose.model(modelName, schema);

module.exports = model;