//Modules
const express = require('express');
const router = express.Router();

//Import class
const Users = require('../controllers/auth.controller');
const userController = new Users();

//Middleware 
const { verifyRol } = require('../middlewares/ve.signup');

//Routes 
//Home
router.get('/', (req, res) => {
   console.log('Auth')
});
//Sing-up
router.get('/signup', async (req, res) => {
   await userController.signupGet(req, res);
});
router.post('/signup', verifyRol, async (req, res) => {
   await userController.signup(req, res);
});

//Sing-in
router.get('/signin', async (req, res) => {
   await userController.signinGet(req,res);
});
router.post('/signin', async (req, res) => {
   await userController.signin(req, res);
});

//Logout
router.get('/logout', async (req, res) => {
   await userController.logout(req, res);
});

//Export
module.exports = router;