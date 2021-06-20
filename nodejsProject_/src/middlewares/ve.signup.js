//Import
const User = require('../models/User');
const Rol = require('../models/Rol');

//Rol
const verifyRol = async (req, res, next) => {
    try {
        const roles = req.body.rol
        if (roles) {
            //Verificar si el rol existe 
            if (roles == 'admin' || roles == 'user') {
                next();
                return ;
            } else return res.json('El rol es incorrecto');
        };
       next();
    } catch (err) {
        return console.error(err);
    };
};

//Export 
module.exports = { verifyRol }; 