var mongoose = require('mongoose');

var InfoSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    address: String,
    address2: { type: String, default:"-" },
    updated: { type: Date, default: Date.now },
    // each user granted by obj id and username
    user: {
        id: { type: mongoose.SchemaTypes.ObjectId, ref: "user" }
        ,
        username: String
    },
    travelBlog:[
        {type:mongoose.SchemaTypes.ObjectId,ref:"userBlog"}
    ]
});

module.exports = mongoose.model('Infomodel', InfoSchema);