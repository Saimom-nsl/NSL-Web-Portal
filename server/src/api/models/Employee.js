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
    nslId: {
        type: String,
        unique: true
    },
    joiningDate: {
        type: Date,
    },
    personalPhoneNumber: {
        type: String,
    },
    officePhoneNumber: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    nid: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"],
    },
    presentAddress: {
        type: String,
    },
    permanentAddress: {
       type: String, 
    },

    skills: {
        type: [Schema.Types.ObjectId],
        ref: "Skills"
    }

}, {timestamps: true});

module.exports = model("Employee", employeeSchema);