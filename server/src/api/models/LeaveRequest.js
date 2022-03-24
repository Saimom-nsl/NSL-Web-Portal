const {Schema, model} = require("mongoose");

const leaveRequestSchema = Schema({
    applyer: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
    },
    endDate: {
        type: Date,
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