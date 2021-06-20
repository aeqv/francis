//Import
const User = require('../models/User');
const Rol = require('../models/Rol');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

//Verificar existencia del token 
const veToken = async (req, res, next) => {
   try {
      //Headers 
      const token = await req.cookies;
      //Comprobar el token
      if(!token) return res.json('No token');
      // Extaer el valor del token. Decodificar 
     const extToken = jwt.verify(token, config.SECRET);
     //Comprobar si el usuario tiene acceso
     const ID = await User.findById(extToken.id, {password: 0});
     if(!ID) return;
     //Next
      next();
   } catch (err) {
      return res.json('No autorizado'); 
   };
};
//Administrador 
const Admin = async (req, res, next) => {
   try {
      //Extaer el valor del token
      const token = await req.headers['jwt'];
      const extToken = jwt.verify(token, config.SECRET);
      //Comprobar si el usuario tiene acceso
      const user = await User.findById(extToken.id, {password: 0});
      const roles = await Rol.find({_id: {$in: user.rol}});
      //Recorrer el array de roles
      for(let i = 0; i < roles.length; i++) {
         if(roles[i].name === 'admin') {
            next()
            return;
         };
      };
      return;
   } catch (err) {
      return res.json('Solo el administrador puede acceder a esta ruta'); 
   };
};

//Export 
module.exports = { veToken, Admin }; 