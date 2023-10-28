const express=require('express');
const optionsController=require('../controllers/optionsController');
const Router=express.Router();

Router.post('/create/:id',optionsController.create);
Router.post('/add_vote/:id',optionsController.add_vote);
Router.patch('/update/:id', optionsController.update);
Router.delete('/delete/:id',optionsController.delete);

module.exports=Router;