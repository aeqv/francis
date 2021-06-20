//Modules
const express = require('express');
const router = express.Router();

//Import class
const Acts = require('../controllers/act.controller');
const actController = new Acts();

//Middleware
const { veToken, Admin } = require('../middlewares/auth.token');

//Routes 
//Get all 
router.get('/', veToken, async (req, res) => {
    await actController.allAct(req, res);
});

//Get by ID
router.get('/:actId', veToken, async (req, res) => {
    await actController.getByIdAct(req, res);
});

//Add
router.post('/', [veToken, Admin], async (req, res) => {
    await actController.addAct(req, res); 
    
});

//Update
router.put('/:actId', [veToken, Admin], async (req, res) => {
    await actController.updateAct(req, res);
});

//Delete 
router.delete('/:actId', [veToken, Admin], async (req, res) => {
    await actController.deleteAct(req, res); 
}); 

//Export 
module.exports = router;

