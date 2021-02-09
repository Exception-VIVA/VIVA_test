var models = require('../models');
const express = require('express');
const router = express.Router();
var Op = models.Sequelize.Op;

//오답노트 문제 가져오기
//localhost:3001/api/incor-note-content/0?note_sn=1&stu_id=samdol
router.get('/:pb', async function (req, res, next) {
    const pb = req.params.pb;

    let result = await models.student.findOne({
        where: {
            stu_id: req.query.stu_id
        }
    });
    const user = result.dataValues.stu_sn;

    //노트 이름
    let title = await models.incor_note.findOne({
        where: {
            note_sn: req.query.note_sn
        }
    })

    //전체 문제 수
    let pbCount = await models.incor_problem.count({
        where: {
            note_sn: req.query.note_sn,
            stu_sn: user
        }
    });

    //문제가 없으면 null 상태 반환
    if (pbCount == 0) {
        res.send({
            message: 'No data',
            status: 'null'
        });
        return;
    }

    //문제들
    let problems = await models.incor_problem.findAll({
        where: {
            note_sn: req.query.note_sn,
            stu_sn: user
        }
    });

    //문제 이미지
    let pb_img = await models.problem.findOne({
        attributes: ['pb_img'],
        where: {
            pb_sn: problems[pb].dataValues.pb_sn
        }
    });

    //답 정보(답안, 풀이 이미지)
    let sols = await models.solution.findOne({
        attributes: ['sol_ans', 'sol_img'],
        where: {
            sol_sn: problems[pb].dataValues.sol_sn
        }
    });

    //문제 정보 : 노트이름, 전체 문제 수, 지금 문제가 몇번째 문제인지, 문제 이미지, 답안, 답 이미지
    const pbInfo = {
        title: title.dataValues.note_name,
        total_pb: pbCount,
        now_pb: pb,
        pb_img: pb_img.dataValues.pb_img,
        sol_ans: sols.dataValues.sol_ans,
        sol_img: sols.dataValues.sol_img
    }

    try {
        res.send({ //교재 정보 넘김
            message: "problem information",
            status: 'success',
            data: {
                pbInfo
            }
        });
    } catch (err) { //무언가 문제가 생김
        res.send({
            message: "ERROR",
            status: 'fail'
        })
    }
});

//오답노트 문제 삭제하기
//localhost:3001/api/incor-note-content/0?note_sn=1&stu_id=samdol
router.delete('/:pb', async function (req, res, next) {
    const pb = req.params.pb;

    let result = await models.student.findOne({
        where: {
            stu_id: req.query.stu_id
        }
    });
    const user = result.dataValues.stu_sn;

    //문제들
    let problems = await models.incor_problem.findAll({
        where: {
            note_sn: req.query.note_sn,
            stu_sn: user
        }
    });

    //문제 삭제
    models.incor_problem.destroy({
        where: {
            incor_pb_sn: problems[pb].dataValues.incor_pb_sn
        }
    })
        .then(num => {
            if (num == 1) { //성공
                res.send({
                    message: "Delete problem",
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
                message: "Could not delete problem",
                status: 'fail'
            });
        });
});

module.exports = router;