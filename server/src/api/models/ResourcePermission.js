const {Schema, model} = require("mongoose");

const resourceWisePermissionSchema = Schema({
    resourceName: {type: String, unique: true},
    rolePermission:{
        type: [Schema.Types.ObjectId],
        ref: 'Role'
    },
    individualPermission: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
});

module.exports = model("RWPM", resourceWisePermissionSchema);

