//Import
const User = require('../models/User');
const Rol = require('../models/Rol');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Controller
class UserControl {
    //Get by username 
    async getUsername (iusername) {
        try {
            const user = await Rol.findOne({username: {$in: iusername}});
            return user;
        } catch (err) {
            console.error(err)
        };
    };
    //Get all users
    async getUsers () {
        try {
            const user = await User.find();
            return user;
        } catch (err) {
            console.error(err); 
        };
    };
};

//Export
module.exports = UserControl;