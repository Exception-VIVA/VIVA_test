require('dotenv').config();
var models = require('../models');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const s3 = new aws.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region
});

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

module.exports = router;