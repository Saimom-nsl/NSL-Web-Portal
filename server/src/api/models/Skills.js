const {Schema, model} = require("mongoose");

const skillsSchema = new Schema({
    empId: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    skillName: {
        type: String
    },
    skillLevel: {
        type: String,
        enum: ["Begainer", "Intermediate", "Advanced"]
    }
}, {timestamps: true});

module.exports = model("Skills", skillsSchema);