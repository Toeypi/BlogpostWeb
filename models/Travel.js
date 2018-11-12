var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);

var TravelSchema = new mongoose.Schema({
    title: {type:String , default:"-"},
    firstname: {type:String , default:"-"},
    author: {
        id:
            { type: mongoose.SchemaTypes.ObjectId, ref: "authorId" },
        name: String
    },
    body: {type:String , default:"-"},
    picture:String,
    comments: [{ body: String, date: Date }],
    date: { currentDate: DateOnly}
});

module.exports = mongoose.model('TravelSchema', TravelSchema);