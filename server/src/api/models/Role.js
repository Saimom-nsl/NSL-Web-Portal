const {Schema, model} = require("mongoose");

const roleSchema = Schema({
    name: {
        type: String,
    },

}, {timestamps: true});

module.exports = model("Role", roleSchema);