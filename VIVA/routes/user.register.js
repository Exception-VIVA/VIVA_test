var models = require('../models');
var crypto = require('crypto');
const express = require('express');
const router = express.Router();
//var Op = models.Sequelize.Op;

//Register
router.post('/', async function (req, res, next) {
  let body = req.body;

  if (!body.stu_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  let exUser = await models.student.findOne({
    where: {
      stu_id: body.stu_id
    }
  })
  if(exUser){
    res.status(500).send({
      message: "duplicate id!"
    });
    return;
  }

  let inputPassword = body.stu_pw;
  let salt = Math.round((new Date().valueOf() * Math.random())) + "";
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  const userInfo = {
    stu_id: body.stu_id,
    stu_pw: hashPassword,
    stu_nick: body.stu_nick,
    stu_grade: body.stu_grade,
    stu_photo: body.stu_photo,
    salt: salt
  }

  models.student.create(userInfo)
    .then(result => {
      // res.send(result);
      res.send({
        status:'success',
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
});

//Read
router.get('/', function (req, res, next) {
  const id = req.query.id;
  //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  models.student.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});

// Update a Tutorial by the id in the request
router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  let body = req.body;

  models.student.update({
    stu_nick: body.stu_nick,
    stu_grade: body.stu_grade,
    stu_photo: body.stu_photo
  }, {
    where: { stu_sn: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "UserInfo was updated successfully."
        });
      } else {
        res.status(500).send({
          message: `Cannot update UserInfo with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating UserInfo with id=" + id
      });
      console.log(err);
    });
});

// Delete
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  models.student.destroy({
    where: { stu_sn: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
});

module.exports = router;