//Import 
const mongoose = require('mongoose');
const { Schema } = mongoose;

//Schema 
const RolSchema = new Schema({
    name: {type: String}
},
{
    versionKey: false
});

//Export model 
module.exports = mongoose.model('Rol', RolSchema); 