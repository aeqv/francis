//Import
const Act = require('../models/Act');

//Controller 
class Acts {
    //Add 
    async addAct (req, res) {
        try {
            const { name, date, type, area, description } = req.body;
            const newAct = new Act({name, date, type, area, description});
            const actSaved = await newAct.save();
            res.status(201).json(actSaved);
            return actSaved;
        } catch (err) {
            console.error(err);            
        };
    };
    //Get by ID
    async getByIdAct (req, res) {
        try {
            const act = await Act.findById(req.params.actId);
            res.status(200).json(act);
            return act; 
        } catch (err) {
            console.error(err); 
        };
    };
    //Update 
    async updateAct (req, res) {
        try {
            const act = await Act.findByIdAndUpdate(req.params.actId, req.body, {
                new: true
            });
            res.status(200).json(act);
            return act; 
        } catch (err) {
            console.error(err); 
        };
    };
    //Delete 
    async deleteAct (req, res) {
        try {
            await Act.findByIdAndDelete(req.params.actId);
            res.status(204).json();
        } catch (err) {
            console.error(err); 
        };
    };
    //Get all activities 
    async allAct (req, res) {
        try {
            res.render('act/act')
            /* 
            const act = await Act.find();
            res.status(200).json(act);
            return act;
            */
        } catch (err) {
            console.error(err); 
        };
    };
};

//Export
module.exports = Acts;
