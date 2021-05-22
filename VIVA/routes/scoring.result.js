var models = require("../models");
const express = require('express');
const router = express.Router();
var Op = models.Sequelize.Op;

//문제집 이름 가져오기
//localhost:3001/api/scoring/result/workbook_title?workbook_sn=190901
router.get('/workbook_title', async function (req, res, next) {
    let result = await models.workbook.findOne({
        where: {
            workbook_sn: req.query.workbook_sn
        }
    });
    const title = result.dataValues.workbook_title;

    try {
        res.send({ //노트 정보 넘김
            message: "workbook_title",
            status: 'success',
            data: {
                title
            }
        });
    } catch (err) { //무언가 문제가 생김
        res.send({
            message: "ERROR",
            status: 'fail'
        })
    }
});

//오답노트 가져오기
//localhost:3001/api/scoring/result/note_list?stu_id=samdol
router.get('/note_list', async function (req, res, next) {


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

    try {
        res.send({ //노트 정보 넘김
            message: "available notes",
            status: 'success',
            data: {
                notes
            }
        });
    } catch (err) { //무언가 문제가 생김
        res.send({
            message: "ERROR",
            status: 'fail'
        })
    }
});

//오답노트 문제 넣기
//localhost:3001/api/scoring/result
router.post('/', async function (req, res, next) {
    let body = req.body;
    let incor_list = body.incor_list;
    incor_list = incor_list.split(',');
    const stu_id = incor_list[0]; //stu_sn 잘라오고
    const note_sn = incor_list[1]; //note_sn 잘라옴
    incor_list.splice(0, 2);


    let result = await models.student.findOne({
        where: {
            stu_id: stu_id
        }
    });
    const user = result.dataValues.stu_sn;



    let pb_list = await models.solution.findAll({ //sol_sn 찾아오기
        attributes: ["pb_sn", "sol_sn"],
        where: {
            pb_sn: {
                [Op.in]: incor_list
            }
        }
    });
    let insert_data = new Array();
    for (var i in pb_list) {
        insert_data[i] = {
            stu_sn: user,
            pb_sn: pb_list[i].pb_sn,
            sol_sn: pb_list[i].sol_sn,
            note_sn: note_sn
        }
    }
    // for (var i in insert_data)
    //     console.log(insert_data[i]);
    models.incor_problem.bulkCreate(insert_data)
        .then(() => {
            res.send({
                message: 'Inserted in incor_problem',
                status: 'success',
                data: {
                    insert_data
                }
            })
        })
        .catch(err => { //무슨 문제가 생겼을까...
            res.send({
                message:
                    err.message || "Some error occurred while insert data.",
                status: 'fail'
            });
        });
});

module.exports = router;
