var models = require('../models');
const express = require('express');
var request = require('request');
const router = express.Router();
var Op = models.Sequelize.Op;
var test_list = require('./lib/scoring_test');

function scoring_info(pb_sn, pb_code, sol_sn, is_correct){ //문제정보 구조체
    this.pb_sn = pb_sn;
    this.pb_code = pb_code;
    this.sol_sn = sol_sn;
    this.is_correct = is_correct;
}

models.solution.belongsTo(models.problem, { foreignKey: "pb_sn"});
models.problem.hasMany(models.solution, { foreignKey: "pb_sn"});

router.post('/', async function (req, res, next) {
    let body = req.body;
    const file_name = body.file_name;
    const split_file_name = file_name.split(',');
    const w_sn = split_file_name[0]; //workbook_sn
    let to_front = new Array();
    let result_cnt = 0;
    let json;

    const YoloResult = (callback) => { //여기 수정해야 함
        const options = {
            method: 'POST',
            uri: "http://127.0.0.1:5000/yolo",
            qs: {
                file_name: file_name
            }
        }

        request(options, async function (err, res, body) {
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
        json = JSON.parse(result);
        async function send_front(split_file_name){
            for(var i=0;i<split_file_name.length-1;i++){
                let final_list = test_list.ans_list(json, i); //실제로 채점할 최종
                let spn_arr = new Array();
                //let score_arr = new Array();
                for (var j in final_list) //spn만 빼오기
                    spn_arr[j] = final_list[j].spn;
                const db_data = await models.problem.findAll({
                    attributes: ['pb_sn', 'pb_code'],
                    include: [
                        {
                            model: models.solution,
                            attributes: ['sol_sn', 'sol_ans'],
                        }
                    ],
                    where: { //workbook_sn과 pb_code로 해당하는 문제들 찾기
                        workbook_sn: w_sn,
                        pb_code: {
                            [Op.in]: spn_arr
                        }
                    }
                });
                for (var j in db_data) {
                    let is_correct = false;
                    //console.log(final_list[j].ans);
                    //console.log(db_data[j].solutions[0].sol_ans);
                    if (db_data[j].solutions[0].sol_ans == final_list[j].ans) //정답이 맞음
                        is_correct = true;
                    //score_arr[j] = new scoring_info(db_data[j].pb_sn, db_data[j].pb_code, db_data[j].solutions[0].sol_sn, is_correct);
                    to_front[result_cnt] = new scoring_info(db_data[j].pb_sn, db_data[j].pb_code, db_data[j].solutions[0].sol_sn, is_correct);
                    result_cnt++;
                }
                //to_front[i] = score_arr;
                //console.log(to_front[i]);
            }
            res.send({
                message: "scoring result!",
                status: "success",
                data: {
                    to_front
                }
            });
        }
        send_front(split_file_name);
    })
});

module.exports = router;