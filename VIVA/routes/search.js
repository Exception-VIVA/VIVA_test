var models = require('../models');
const express = require('express');
const router = express.Router();
var Op = models.Sequelize.Op;

//Search
//localhost:3001/api/search?title=수능&stu_id=samdol
router.get('/', async function (req, res, next) {
    const search = req.query.title; //검색어
    const input_stu_id = req.query.stu_id;

    let result = await models.student.findOne({
        where: {
            stu_id: input_stu_id
        }
    });

    //사용자가 보유한 책의 workbook_sn 끌올
    let user_books = await models.stu_workbook.findAll({
        attributes: ['workbook_sn'],
        where: {
            stu_sn: result.dataValues.stu_sn
        }
    });

    var book_list = new Array(); //끌올한 workbook_sn을 book_list에 배열로 저장
    for(var i in user_books){
        book_list.push(user_books[i].dataValues.workbook_sn);
    }

    let search_result = await models.workbook.findAll({
        where: {
            workbook_title: { //제목에 검색어가 포함됐나?
                [Op.like]: `%${search}%`
            },
            workbook_sn: { //사용자가 보유한 책이 아닌가?
                [Op.notIn]: book_list
            },
            workbook_publisher: { //학평 제외
                [Op.not]: 'Gyoyuk'
            }
        }
    });

    if (search_result.length != 0) { //교재 있냐?
        try {
            res.send({ //교재 정보 넘김
                message: "Search results",
                status: 'success',
                data: {
                    search,
                    search_result
                }
            });
        } catch (err) { //무언가 문제가 생김
            res.send({
                message: "ERROR",
                status: 'fail'
            })
        }
    }
    else { //검색결과에 해당하는 교재 없거나 실패한 것임
        res.send({
            message: "No results or fail",
            status: 'null'
        });
    }
});

//Search
//localhost:3001/api/search?title=수능&stu_id=samdol
router.post('/', async function (req, res, next) {
    const search = req.query.title; //검색어
    let body = req.body;
    let isWorkbook=true;
    const input_stu_id = req.query.stu_id;

    let result = await models.student.findOne({
        where: {
            stu_id: input_stu_id
        }
    });

    const user = result.dataValues.stu_sn;

    //body로 넘겨준 workbook_sn에 해당하는 문제집 찾기. body로 workbook_sn만 넘겨주면 됨
    let selected_book = await models.workbook.findOne({
        where : {
            workbook_sn: body.workbook_sn
        }
    });

    //해당 책이 일반 교재인지 학원 교재인지 판단. isWorkbook이 true면 일반 교재고, 아니면 학원 교재임
    if(body.workbook_sn>=1000000){
        isWorkbook = false;
    }

    //workbook_sn, stu_sn으로 stu_workbook 테이블에 데이터 넣기
    models.stu_workbook.create({
        workbook_sn: selected_book.dataValues.workbook_sn,
        stu_sn: user
    })
    .then(result => {
      res.send({
        message: 'Inserted in DB',
        status:'success',
        data:{ //result는 그냥 내가 postman에서 보려고 넣은거라 실제로 쓸 때는 빼고 isWorkbook만 가져가도 괜찮음.
            result,
            isWorkbook
        }
      })
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while insert data.",
        status:'fail'
      });
    });
});

module.exports = router;