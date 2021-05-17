var models = require('../models');
const express = require('express');
var request = require('request');
const router = express.Router();
var Op = models.Sequelize.Op;

function printJson(json){
    console.log(json);
}

router.post('/', function (req, res, next) {
    let body = req.body;
    const file_name = body.file_name;
    const split_file_name = file_name.split(',');
    const w_sn = split_file_name[0]; //workbook_sn

    const YoloResult = (callback)=>{
        const options = {
            method: 'POST',
            uri: "http://127.0.0.1:5000/yolo",
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
        let json = JSON.parse(result);
        res.send({
            message: "from flask",
            status: "success",
            data:{
                json,
                w_sn
            }
        });
        //printJson(json);
    })

});

module.exports = router;