var express = require('express');
var db = require('../models/index');

var router = express.Router();
var incor_problem = db.incor_problem;
var problem = db.problem;
var problemtype = db.problemtype;
var solution = db.solution;
var student = db.student;
var stuta_map = db.stuta_map;
var teacher = db.teacher;
var workbook = db.workbook;

// router.get("/:id", function(req, res, next){
//   workbook.findAll({
//     include:
//   })
// })

module.exports = router;