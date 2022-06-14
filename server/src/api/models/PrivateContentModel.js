const {Schema, model} = require("mongoose");

const privateContentSchema = new Schema({
    title: {
        type: String
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contentPath: {
        type: String
    },
    isAdminUploaded: Boolean,
    isNonAdminUploaded: Boolean
}, {timestamps: true});

module.exports = model("PrivateContent", privateContentSchema);