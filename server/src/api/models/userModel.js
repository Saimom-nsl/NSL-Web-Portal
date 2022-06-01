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
    isPasswordChanged: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
    token: {
        type: String
    }


}, { timestamps: true });


module.exports = model("User", userSchema);