require('dotenv').config({path: __dirname+"/../.env/awsconfig.env"});
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
// 이거 먼저 post로 실행한 뒤 얻어낸 이미지 url로 put???
// 실행해서 내가 req.file에 파일 정보 보냄. 거기서 파일 경로 뽑아서 req.body에 같이 싸서 put할 때 같이 보내는 것
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "profile/");
//   },
//   filename: (req, file, cb) => { //파일 이름 지정. 어떻게 저장됐는지 모르겠어서 일단 현재시각+프론트에서 지정한 파일이름으로 함
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

var storage = multerS3({ //s3 하고나면 이걸로 할 듯..?
  s3: s3,
  bucket: 'viva-s3-capstone',
  acl: 'public-read',
  key: function (req, file, cb) {
    cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + '.' + file.originalname.split('.').pop());
  }
});
var upload = multer({ storage: storage });

// Router
router.post("/", upload.single('profile_img'), (req, res) => {
  try {
    res.send({ //파일 정보 넘김
      message: "upload success",
      status: 'success',
      data: {
        file: req.file
      }
    });
  } catch (err) { //무언가 문제가 생김
    res.send({
      message: "ERROR",
      status: 'fail'
    })
  }
});

// Update userInfo
//localhost:3001/api/user/profile/samdol
router.put('/:stu_id', function (req, res, next) {
  const id = req.params.stu_id;
  let body = req.body;

  models.student.update({
    stu_nick: body.stu_nick,
    stu_grade: body.stu_grade,
    stu_photo: body.stu_photo
  }, {
    where: { stu_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserInfo was updated successfully.",
          status: 'success'
        });
      } else {
        res.send({
          message: "Data was not found or req.body is empty!",
          status: 'fail'
        });
      }
    })
    .catch(err => {
      res.send({
        message: "Error updating UserInfo",
        status: 'fail'
      });
      console.log(err);
    });
});

module.exports = router;
