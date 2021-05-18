var models = require('../models');
var request = require('request');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + "/../config/awsconfig.json");
const s3 = new aws.S3();

const router = express.Router();
var Op = models.Sequelize.Op;
var fs = require('fs');

// multer-optional
var storage = multerS3({ //s3
    s3: s3,
    bucket: 'viva-s3-capstone',
    acl: 'public-read',
    key: function (req, file, cb) {
        cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + '.' + file.originalname.split('.').pop());
    }
});
var upload = multer({storage: storage});

// Router
router.post("/", upload.array('mark'), (req, res) => {
    try {
        res.send({ //파일 정보 넘김
            message: "upload success",
            status: 'success',
            data: {
                files: req.files
            }
        });
    } catch (err) { //무언가 문제가 생김
        res.send({
            message: "ERROR",
            status: 'fail'
        })
    }
});

// router.get("/scoring", async function (req, res) {
//     const file_name = req.query.file_name;
//     let result;
//
//     const options = {
//         method: 'GET',
//         uri: "http://127.0.0.1:5000/scoring-yolo",
//         qs: {
//             file_name: file_name
//         }
//     }
//
//     await request(options, async function (err, res, body) {
//         if (err)
//             console.log("error!!");
//         result = body;
//         console.log(result);
//         return result
//     });
// })

module.exports = router;