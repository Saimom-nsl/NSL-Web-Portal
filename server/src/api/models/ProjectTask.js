const {Schema, model} = require("mongoose");

const projectTask = Schema({
    
    taskName: {
        type: String,
    },
    status: {
        type: String,
        enum: ["unassigned","not-started","ongoing","completed"],
        default: "unassigned"
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    
    assignBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    assignTo: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    dueDate: {
        type: Date,
    }

}, {timestamps: true});

module.exports = model("ProjectTask", projectTask);