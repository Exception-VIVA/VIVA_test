var models = require('../models');
var crypto = require('crypto');
const express = require('express');
const router = express.Router();
var Op = models.Sequelize.Op;

//Login
router.post('/', async function (req, res, next) {
    let body = req.body;

    if(!body.stu_id){
        res.status(500).send({
            message: "student id is null"
        });
        return;
    }

    let result = await models.student.findOne({
        where: {
            stu_id: body.stu_id
        }
    });

    let dbPassword = result.dataValues.stu_pw;
    let inputPassword = body.stu_pw;
    let salt = result.dataValues.salt;
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    if (dbPassword === hashPassword) {
        res.send({
            message: "Login success",
            status:'success',
            data:{
                stu_id:body.stu_id
            }
        });
    }
    else {
        res.status(500).send({
            message: "Wrong Password"
        });
    }
})

module.exports = router;