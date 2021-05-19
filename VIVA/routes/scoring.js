var models = require('../models');
const express = require('express');
var request = require('request');
const router = express.Router();
var Op = models.Sequelize.Op;
var test_list = require('./lib/scoring_test');

router.post('/', function (req, res, next) {
    let body = req.body;
    const file_name = body.file_name;
    const split_file_name = file_name.split(',');
    const w_sn = split_file_name[0]; //workbook_sn
    let to_front = new Array();

    const YoloResult = (callback) => {
        const options = {
            method: 'POST',
            uri: "http://127.0.0.1:5000/yolo",
            qs: {
                file_name: file_name
            }
        }

        request(options, function (err, res, body) {
            callback(undefined, {
                result: body
            });
        });
    }

    YoloResult((err, {result} = {}) => {
        if (err) {
            console.log("error!!!!");
            res.send({
                message: "fail",
                status: "fail"
            });
        }
        let json = JSON.parse(result);
        for(var i=0;i<split_file_name.length-1;i++) {
            let final_list = test_list.ans_list(json, i); //실제로 채점할 최종
            to_front[i] = final_list;
            console.log(final_list);
        }
        res.send({
            message: "from flask",
            status: "success",
            data: {
                to_front,
                w_sn
            }
        });
    })
});

module.exports = router;