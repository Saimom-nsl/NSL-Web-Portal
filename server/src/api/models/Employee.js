const {Schema, model} = require("mongoose");
const {capitalizeFirstLetter} = require("../helpers/commonHelper");

const employeeSchema = new Schema({
    firstName: {
        type: String,
        set: (v)=> capitalizeFirstLetter(v)
    },
    lastName: {
        type: String,
        set: (v)=> capitalizeFirstLetter(v)

    },
    middleName: {
        type: String,
        set: (v)=> capitalizeFirstLetter(v)
    },
    email: String,
    phoneNumber: {
        type: [String],
    },
    employmentDate: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    sex: {
        type: String,
        enum: ["male", "female", "others"],
    },
    address: {
        type: String,
    },
    department: {
        type: [Schema.Types.ObjectId],
        ref: "Department",
    }

}, {timestamps: true});

module.exports = model("Employee", employeeSchema);