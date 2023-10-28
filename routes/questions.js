
const express = require('express')
const questionController = require('../controllers/questionsController')
const Router = express.Router()

Router.post('/create',questionController.create)
Router.get('/:id',questionController.showDetails)
Router.delete('/delete/:id',questionController.deleteQues)
Router.use('/options',require('./options'))

module.exports=Router;