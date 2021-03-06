const {Schema, model} = require("mongoose");

const userSchema = Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    },
    isActive: {
        type: Boolean,
        
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    }


}, { timestamps: true });

module.exports = model("User", userSchema);