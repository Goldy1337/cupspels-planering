const modelName = 'User';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

let schema = new Schema ({
    teamId: { type: Types.ObjectId, ref: 'Team'},
    name: {type: String, required: true},
    role: {type: String, required: true, enum:["SuperAdmin", "Admin", "Referee", "MatchAdmin", "Participant", "Member"]},
    subRole: {type: String},
    email: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    password: {type: String, required: true}
});

let model = mongoose.model(modelName, schema);

module.exports = model;