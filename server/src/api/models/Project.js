const {Schema, model} = require("mongoose");

const projectSchema = Schema({
    name: {
        type: String,
    },
    
    startDate: {
        type: Date,
    },

    details: {
        type: String
    },

    teamLead: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    
    isActive: {
        type: Boolean,
        default: true
    },


}, {timestamps: true});

module.exports = model("Project", projectSchema);