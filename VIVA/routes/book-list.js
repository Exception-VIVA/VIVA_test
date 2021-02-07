var models = require('../models');
const express = require('express');
const router = express.Router();
var Op = models.Sequelize.Op;

/*
책 리스트 get으로 불러오는건 home.js에 있는 코드랑 존똑이라
app.js에서 걔 끌올해오는 방법으로 처리

localhost:3001/api/book-list/workbook?stu_id=samdol
localhost:3001/api/book-list/academy?stu_id=samdol
localhost:3001/api/book-list/incor-note?stu_id=samdol
이거 get으로 호출하면 리스트 나와유
*/

async function deleteBook(req, res) {
    const input_stu_id = req.query.stu_id;
    const sn = req.params.sn;

    let result = await models.student.findOne({
        where: {
            stu_id: input_stu_id
        }
    });

    models.stu_workbook.destroy({
        where: {
            stu_sn: result.dataValues.stu_sn,
            workbook_sn: sn
        }
    })
        .then(num => {
            if (num == 1) { //성공
                res.send({
                    message: "Delete book",
                    status: 'success'
                });
            } else { //데이터 입력 잘못한듯
                res.send({
                    message: "Data was not found!",
                    status: 'fail'
                });
            }
        })
        .catch(err => { //에러
            res.send({
                message: "Could not delete book",
                status: 'fail'
            });
        });
}

// Delete
//localhost:3001/api/book-list/workbook/'삭제할 workbook_sn'?stu_id=samdol
router.delete('/workbook/:sn', async function (req, res, next) {
    deleteBook(req, res);
});

// Delete
//localhost:3001/api/book-list/academy/'삭제할 workbook_sn'?stu_id=samdol
router.delete('/academy/:sn', async function (req, res, next) {
    deleteBook(req, res);
});

// Delete
//localhost:3001/api/book-list/incor-note/'삭제할 note_sn'?stu_id=samdol
router.delete('/incor-note/:sn', async function (req, res, next) {
    const input_stu_id = req.query.stu_id;
    const sn = req.params.sn;

    let result = await models.student.findOne({
        where: {
            stu_id: input_stu_id
        }
    });

    models.incor_note.destroy({
        where: {
            stu_sn: result.dataValues.stu_sn,
            note_sn: sn
        }
    })
        .then(num => {
            if (num == 1) { //성공
                res.send({
                    message: "Delete book",
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
                message: "Could not delete book",
                status: 'fail'
            });
        });
});

// Update incor-note
//localhost:3001/api/book-list/incor-note/'수정할 note_sn'?stu_id=samdol
router.put('/incor-note/:sn', async function (req, res, next) {
    const input_stu_id = req.query.stu_id;
    const sn = req.params.sn;
    let body = req.body;

    let result = await models.student.findOne({
        where: {
            stu_id: input_stu_id
        }
    });

    models.incor_note.update({ //이름, 사진 수정
        note_name: body.note_name,
        note_photo: body.note_photo
    }, {
        where: { 
            stu_sn: result.dataValues.stu_sn,
            note_sn: sn
         }
    })
        .then(num => {
            if (num == 1) { //성공
                res.send({ 
                    message: "incor_note was updated successfully.",
                    status: 'success'
                });
            } else { //데이터 입력 잘못한듯
                res.send({
                    message: "Data was not found or req.body is empty!",
                    status: 'fail'
                });
            }
        })
        .catch(err => { //에러
            res.send({
                message: "Error updating incor_note",
                status: 'fail'
            });
            console.log(err);
        });
});

module.exports = router;