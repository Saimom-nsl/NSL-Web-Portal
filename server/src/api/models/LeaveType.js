const {Schema, model} = require("mongoose");

const leaveSchema = Schema({
    name: String,
    leaveDetails: String,
    leaveAmount: Number,


}, {timestamps: true});

module.exports = model("LeaveType", leaveSchema);