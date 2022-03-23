const {Schema, model} = require("mongoose");

const departmentSchema = Schema({
    name: String,
    details: String,
    member: {
        type: [Schema.Types.ObjectId],
        ref: "Employee"
    }


}, {timestamps: true});

module.exports = model("Department", departmentSchema);