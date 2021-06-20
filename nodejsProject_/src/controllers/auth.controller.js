//Import
const User = require('../models/User');
const Rol = require('../models/Rol');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//Controller 
class Users {
    //Sign-Up
    async signupGet (req, res) {
        res.render('auth/signup');
    };

    async signup (req, res) {
        try {
            const { fullName, username, email, area, password, rol } = req.body;
            const newUser = new User({ 
                fullName, 
                username, 
                email, 
                area,
                password: await User.cifrar(password)
            });
            //Rol
            if (rol) {
                const foundRol = await Rol.find({name: {$in: rol}});
                newUser.rol = foundRol.map(roles => roles._id);
            } else {
                const role = await Rol.findOne({name: 'user'});
                newUser.rol = [role._id];
            };
            //Guardar
            const userSaved = await newUser.save();
            console.log(userSaved);
            //Generar un token
            const token = jwt.sign({id: userSaved._id}, config.SECRET, {
                expiresIn: 10368000 //120 días 
            });
            //Cookies
            res.cookie('jwt', token, { httpOnly: true, maxAge: 10368000 });
            res.redirect('/');
        } catch (err) {
            console.error(err);            
        };
    };
    //Sing-In
    async signinGet (req, res) {
        res.render('auth/signin');
    };
    async signin (req, res) {
        try {
            //Comprobar registro del usuario 
           const userRegis = await User.findOne({email: req.body.email}).populate('rol');
           if (userRegis) {
               //Comprobar contraseña 
               const comparePassword = await User.comparePass(req.body.password, userRegis.password);
               if(comparePassword) {
                   const token = jwt.sign({id: userRegis._id}, config.SECRET, {
                       expiresIn: 10368000 //120 días 
                    });
                    //Cookies
                    res.cookie('jwt', token, { httpOnly: true, maxAge: 10368000 });
                    //Prueba
                    console.log({user: userRegis._id});
                    console.log(userRegis.username)
                    console.log
                    res.redirect('/activities');
                    return;
                } else res.json('Contraseña incorrecta');
            } else res.json('El usuario no se encuentra registrado');
        } catch (err) {
            console.error(err);
        };
    };
    //Logout 
    async logout (req, res) {
        console.log('logout')
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/')  
    };
};

//Export 
module.exports = Users;
