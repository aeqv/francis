//Rutas de usuario del administrador 
//Modules
const express = require('express');
const router = express.Router();

//Import middleware
const { veToken, Admin } = require('../middlewares/auth.token');
//Import controller
const UserControl = require('../controllers/user.controller');
const userController = new UserControl();

//Routes 
//Get all
router.get('/', [veToken, Admin], async (req, res) => {
    const user = await userController.getUsers(); 
    res.json(user);
});

//Get by username 
router.get('/:username', [veToken, Admin], async (req, res) => {
    const user = await userController.getUsername(req.params.username); 
    res.json(user);
});

//Export 
module.exports = router;