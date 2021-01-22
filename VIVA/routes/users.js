var express = require('express');
var userModel = require('../models').user;
var router = express.Router();

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
router.get('/', async(req, res, next) =>{
  try{
    const users = await userModel.findAll();
    res.render('user', {users});
  } catch(error){
    console.error(error);
    next(error);
  }
});

module.exports = router;