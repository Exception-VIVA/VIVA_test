var models = require("../models");
const express = require('express');
const router = express.Router();
var Op = models.Sequelize.Op;

//오답노트 가져오기
//localhost:3001/api/test/form?stu_id=samdol
router.get('/', async function (req, res, next) {
    let result = await models.student.findOne({
        where: {
            stu_id: req.query.stu_id
        }
    });
    const user = result.dataValues.stu_sn;

    //사용자가 보유한 오답노트
    let notes = await models.incor_note.findAll({
        where: {
            stu_sn: user
        }
    });

    //오답노트가 없음
    if (notes.length == 0) {
        res.send({
            message: 'No incor-note',
            status: 'null'
        });
        return;
    }

    //오답노트 중에서 문제가 들어있는 노트만 보여주기
    let note_list = new Array();
    for (var i in notes) {
        let pbCount = await models.incor_problem.count({
            where: {
                note_sn: notes[i].dataValues.note_sn,
                stu_sn: user
            }
        });
        if (pbCount != 0) {
            note_list.push(notes[i]);
        }
    }

    try {
        res.send({ //노트 정보 넘김
            message: "available notes",
            status: 'success',
            data: {
                note_list
            }
        });
    } catch (err) { //무언가 문제가 생김
        res.send({
            message: "ERROR",
            status: 'fail'
        })
    }
});

//모의고사 생성하기
//localhost:3001/api/test/form?stu_id=samdol
router.post('/', async function (req, res, next) {
    let body = req.body;

    let result = await models.student.findOne({
        where: {
            stu_id: req.query.stu_id
        }
    });
    const user = result.dataValues.stu_sn;

    //모의고사 생성
    let sn; //생성된 모의고사의 sn
    models.test.create({
        stu_sn: user,
        test_title: body.test_title
    })
        .then(result => {
            sn = result.dataValues.test_sn;
        })
        .catch(err => {
            console.log(err);
        });


    //incor_problem 테이블에서 생성할 때 사용한 오답노트 안에 있는 문제 찾아오기
    let pb_list = new Array();
    let pbs = await models.incor_problem.findAll({
        attributes: ['pb_sn'],
        where: {
            note_sn: body.note_sn,
            stu_sn: user
        }
    });
    for (var i in pbs) {
        pb_list.push(pbs[i].dataValues.pb_sn);
    }

    //문제들 유형 찾아오기
    let d_type_list = new Array();
    let types = await models.problem.findAll({
        attributes: ['pbtype_sn'],
        where: {
            pb_sn: {
                [Op.in]: pb_list
            },
            pbtype_sn: { //문제 유형 null인 것들 제외
                [Op.ne]: null
            }
        }
    });
    for (var i in types) {
        d_type_list.push(types[i].dataValues.pbtype_sn);
    }

    //중복 제거
    let set = new Set(d_type_list);
    let type_list = [...set];

    //init-models.js에 있는데 왜...
    models.problem.belongsTo(models.workbook, { foreignKey: "workbook_sn" });
    models.workbook.hasMany(models.problem, { foreignKey: "workbook_sn" });

    //오답노트 문제들과 유형이 동일하고 교육청 모의고사인 모든 문제들
    let pb_array = new Array();
    let pb_candidate = await models.problem.findAll({
        attributes: ['pb_sn'],
        include: [
            {
                model: models.workbook,
                where: {
                    workbook_publisher: 'Gyoyuk'
                }
            }
        ],
        where: {
            pbtype_sn: {
                [Op.in]: type_list
            }
        }
    });
    for (var i in pb_candidate) {
        pb_array.push(pb_candidate[i].dataValues.pb_sn);
    }

    //10개 뽑기
    let test_pb = new Array();
    for (var i = 0; i < 10; i++) {
        var temp = pb_array.splice(Math.floor(Math.random() * pb_array.length), 1)[0];
        test_pb.push(temp);
    }

    for (var i = 0; i < 10; i++) {
        models.test_pb_map.create({
            test_sn: sn,
            pb_sn: test_pb[i]
        })
            .catch(err => {
                console.log(err);
            });
    }

    try {
        res.send({ //시험지 정보 넘김
            message: "test created",
            status: 'success',
            data: {
                test_title: body.test_title,
                student: user,
                problems: test_pb
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