var models = require('../models');
const express = require('express');
var request = require('request');
const router = express.Router();
var Op = models.Sequelize.Op;

function printJson(json) {
    console.log(json);
}

function ans_info(spn, ans) { //문제정보 구조체
    this.spn = spn;
    this.ans = ans;
}

function check_info(label, x_pos, y_pos) {
    this.label = label;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
}

function findSpn(spn_list) { //spn만 찾음
    let spn = '';
    for (var i in spn_list[0]) {
        if (spn_list[0][i] >= '0' && spn_list[0][i] <= '9')
            spn += spn_list[0][i];
    }
    return spn;
}

function refactoringCheck(check_list) { //객관식 답안 중복 제거하고 정렬
    let first_y, second_y;
    for (var i in check_list) {
        if (i == 0) //첫번째 원소의 y 좌표로 전부 통일할 것
            first_y = check_list[i].y_pos;
        else if (Math.abs(check_list[i].y_pos - first_y) < 15) //나중에 두줄짜리일 때를 대비
            check_list[i].y_pos = first_y;
    }
    check_list.sort(function (a, b) { //오름차순 정렬
        if (a.x_pos > b.x_pos) return 1;
        return -1;
    })
    for (var i in check_list) {
        if (i == 0)
            continue;
        if (Math.abs(check_list[i].x_pos - check_list[i - 1].x_pos) < 10) { //이전 것과 x_pos 차이 거의 없으면 중복
            check_list.splice(i, 1);
            i--;
        }
    }
    return check_list;
}

function makeList(json, index) {
    let ans = new Array();
    let cnt = 0, ans_cnt = 0;
    let spn = '';
    let check_list = new Array(); //객관식 또는 주관식 답안 정보
    for (var i in json.yolo_result[index]) {
        let cur = json.yolo_result[index][i];
        let spn_list;
        if (cur.label == "spn" || cur.label == "page_num") {
            if (i > 0) {
                check_list = refactoringCheck(check_list);
                ans[ans_cnt] = new ans_info(spn, check_list);
                check_list = new Array(); //초기화
                cnt = 0;
                ans_cnt++;
            }
            spn_list = new Array();
            spn_list = cur.recognition_word; //spn에서 찾은 모든 단어
            spn = findSpn(spn_list);
        } else if (cur.label == "uncheck_box" || cur.label == "check_box") {
            check_list[cnt] = new check_info(cur.label, cur.x, cur.y);
            cnt++;
        }
    }
    return ans;
}

function finalList(ans_list) { //주관식 해야함
    let final_list = new Array();
    for (var i in ans_list) {
        let spn = Number(ans_list[i].spn);
        let checked = 1;
        for (var j in ans_list[i].ans) {
            if (ans_list[i].ans[j].label == "check_box") {
                checked += Number(j);
                break;
            }
        }
        final_list[i] = new ans_info(spn, checked);
    }
    return final_list;
}

router.post('/', function (req, res, next) {
    let body = req.body;
    const file_name = body.file_name;
    const split_file_name = file_name.split(',');
    const w_sn = split_file_name[0]; //workbook_sn

    const YoloResult = (callback) => {
        const options = {
            method: 'POST',
            uri: "http://127.0.0.1:5000/yolo",
            qs: {
                file_name: file_name
            }
        }

        request(options, function (err, res, body) {
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
        let json = JSON.parse(result);
        for(var i=0;i<split_file_name.length-1;i++) {
            let ans_list = makeList(json, i);
            let final_list = finalList(ans_list); //실제로 채점할 최종
            console.log(final_list);
        }
        res.send({
            message: "from flask",
            status: "success",
            data: {
                json,
                w_sn
            }
        });
        //printJson(json);
    })

});

module.exports = router;