var models = require("../models");
const express = require('express');
const router = express.Router();
var Op = models.Sequelize.Op;

//미니모의고사 가져오기
//localhost:3001/api/test/list?stu_id=samdol
router.get('/', async function (req, res, next) {
    let result = await models.student.findOne({
        where: {
            stu_id: req.query.stu_id
        }
    });
    const user = result.dataValues.stu_sn;

    //사용자가 보유한 미니모의고사
    let test_list = await models.test.findAll({
        where: {
            stu_sn: user
        }
    });

    if (test_list.length != 0) {
        try {
            res.send({ //모의고사 정보 넘김
                message: "test list",
                status: 'success',
                data: {
                    test_list
                }
            });
        } catch (err) { //무언가 문제가 생김
            res.send({
                message: "ERROR",
                status: 'fail'
            })
        }
    }
    else{ //미니모의고사 없음
        res.send({
            message: "No data or fail",
            status: 'null'
        })
    }
});

//미니모의고사 다운로드에 쓰지 않을까 싶어서...
//localhost:3001/api/test/list/download?test_sn=18&stu_id=samdol
router.get('/download', async function (req, res, next) {
    let result = await models.student.findOne({
        where: {
            stu_id: req.query.stu_id
        }
    });
    const user = result.dataValues.stu_sn;

    models.test_pb_map.belongsTo(models.problem, { foreignKey: "pb_sn"});
    models.problem.hasMany(models.test_pb_map, { foreignKey: "pb_sn"});

    //다운로드 할 모의고사 문제의 이미지
    let pbs_img = await models.problem.findAll({
        attributes: ['pb_sn', 'pb_img'],
        include: [
            {
                model: models.test_pb_map,
                attributes: [],
                where: {
                    test_sn: req.query.test_sn
                }
            }
        ]
    });

    try {
        res.send({ //문제 정보 넘김
            message: "problems",
            status: 'success',
            data: {
                pbs_img
            }
        });
    } catch (err) { //무언가 문제가 생김
        res.send({
            message: "ERROR",
            status: 'fail'
        })
    }
});

// Delete
//localhost:3001/api/test/list/'삭제할 미니모의고사 sn'?stu_id=samdol
router.delete('/:sn', async function (req, res, next) {
    const sn = req.params.sn;

    let result = await models.student.findOne({
        where: {
            stu_id: req.query.stu_id
        }
    });
    const user = result.dataValues.stu_sn;

    models.test.destroy({
        where: {
            stu_sn: user,
            test_sn: sn
        }
    })
        .then(num => {
            if (num == 1) { //성공
                res.send({
                    message: "Delete test",
                    status: 'success'
                });
            } else { //데이터 입력을 잘못한듯
                res.send({
                    message: "Data was not found!",
                    status: 'fail'
                });
            }
        })
        .catch(err => { //에러
            res.send({
                message: "Could not delete test",
                status: 'fail'
            });
        });
});

module.exports = router;