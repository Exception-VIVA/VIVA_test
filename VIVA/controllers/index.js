var express = require('express');
var models = require('../models');
var crypto = require('crypto');
var router = express.Router();
var Op = models.Sequelize.Op;

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.json('index');
// });

// router.get('/board', function(req, res, next){
//   models.student.findAll()
//   .then(result =>{
//     res.json('show', {
//       students: result
//     });
//   })
//   .catch(function(err){
//     console.log(err);
//   });
// });

// router.post('/board', function(req, res, next){
//   let body = req.body;

//   models.student.create({
//     stu_id: body.inputId,
//     stu_pw: body.inputPw,
//     stu_nick: body.inputNick,
//     stu_grade: body.inputGrade,
//     stu_photo: body.inputPic
//   })
//   .then(result => {
//     console.log("success");
//     res.redirect('/board');
//   })
//   .catch(err => {
//     console.log(err);
//   })
// });

// router.get('/edit/:id', function(req, res, next) {
//   let postID = req.params.id;

//   models.student.findOne({
//     where: {stu_sn: postID}
//   })
//   .then( result => {
//     res.json("edit", {
//       post: result
//     });
//   })
//   .catch( err => {
//     console.log(err);
//   });
// });

// router.put('/board/:id', function(req, res, next) {
//   let postID = req.params.id;
//   let body = req.body;

//   models.student.update({
//     stu_id: body.editId,
//     stu_pw: body.editPw,
//     stu_nick: body.editNick,
//     stu_grade: body.editGrade,
//     stu_photo: body.editPic
//   },{
//     where: {stu_sn: postID}
//   })
//   .then( result => {
//     console.log("데이터 수정 완료");
//     res.redirect("/board");
//   })
//   .catch( err => {
//     console.log(err);
//   });
// });

// router.delete('/board/:id', function(req, res, next) {
//   let postID = req.params.id;

//   models.student.destroy({
//     where: {stu_sn: postID}
//   })
//   .then( result => {
//     res.redirect("/board")
//   })
//   .catch( err => {
//     console.log(err);
//   });
// });

// router.get('/sign_up', function(req, res, next) {
//   res.json("user/signup");
// });


exports.create = (req, res) => {
  // const id = req.body.stu_id || '';
  // if(!id.length){
  //   return res.status(400).json({err: 'Incorrect id'});
  // }
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  const userInfo = {
    stu_id: body.userId,
    stu_pw: hashPassword,
    stu_nick: body.userNick,
    stu_grade: body.userGrade,
    stu_photo: body.userPhoto,
    salt: salt
  }

  models.student.create(userInfo)
  .then( result => {
    res.send(result);
  })
  .catch( err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while creating the Tutorial."
    });
  });
};

//module.exports = router;
