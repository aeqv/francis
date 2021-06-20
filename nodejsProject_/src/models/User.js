//Import 
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

//Schema 
const UserSchema = new Schema({
    fullName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    area: {type: String, required: true},
    password: {type: String, required: true},
    rol: [{
        ref: "Rol",
        type: Schema.Types.ObjectId
    }]
},
{
    timestamps: true, 
    versionKey: false
});

//Cifrar password
UserSchema.statics.cifrar = async (password) => {
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
};

//Comparar password
UserSchema.statics.comparePass = async (password, received) => {
    return await bcrypt.compare(password, received);
};

//Export model
module.exports = mongoose.model('User', UserSchema); 