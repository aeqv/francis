//Import 
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Schema 
const ActSchema = new Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    type: {type: String, required: true},
    area: {type: String, required: true},
    description: {type: String, required: true}
},
{
    timestamps: true, 
    versionKey: false
});

//Export model 
module.exports = mongoose.model('Act', ActSchema); 