var models = require('../models');
const express = require('express');
var request = require('request');
const router = express.Router();
var Op = models.Sequelize.Op;

function printJson(json){
    console.log(json);
}

router.get('/', function (req, res, next) {
    const file_name = req.query.file_name;

    const YoloResult = (callback)=>{
        const options = {
            method: 'GET',
            uri: "http://127.0.0.1:5000/scoring-yolo",
            qs: {
                file_name: file_name
            }
        }

        request(options, function (err, res, body) {
            callback(undefined, {
                result:body
            });
        });
    }

    YoloResult((err, {result}={})=>{
        if(err){
            console.log("error!!!!");
            res.send({
                message: "fail",
                status: "fail"
            });
        }
        const json = JSON.parse(result);
        res.send({
            message: "from flask",
            status: "success",
            data:{
                flask : json
            }
        });
        printJson(json);
    })

});

module.exports = router;