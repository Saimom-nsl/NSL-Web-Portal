const {Schema, model} = require("mongoose");

const leaveRequestSchema = Schema({
    applyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    leaveType: {
        type: Schema.Types.ObjectId,
        ref: "LeaveType"
    },
    details: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isApproved: {
        type: String,
        enum: ["approved", "rejected", "pending"],
        default: "pending"
    }

    // isApproved: {
    //     type: [
    //         {
    //             approvedBy: Schema.Types.ObjectId,
    //             approved: Boolean
    //         }
    //         ]
    // }


}, {timestamps: true});

module.exports = model("LeaveRequest", leaveRequestSchema);