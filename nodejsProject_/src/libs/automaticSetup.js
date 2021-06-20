//Import
const Rol = require('../models/Rol');

//Generar roles 
const createRol = async () => {
    try {
        //Contador de roles
        const count = await Rol.estimatedDocumentCount();
        if(count > 0) return;
        //Crear roles
       const roles = await Promise.all([
            new Rol({name: 'user'}).save(),
            new Rol({name: 'admin'}).save()
        ]); 
    } catch (err) {
        console.error(err);
    };
};

//Export 
module.exports = createRol; 
