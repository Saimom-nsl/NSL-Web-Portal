const {Schema, model} = require("mongoose");

const officeSchema = new Schema({
    name: {
        type: String,
    },
    location: {
        type: String,
    }

}, {timestamps: true});

module.exports = model("Office", officeSchema);