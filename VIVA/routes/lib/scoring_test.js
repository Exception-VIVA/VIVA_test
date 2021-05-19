const express = require('express');
const router = express.Router();

function ans_info(spn, ans) { //문제정보 구조체
    this.spn = spn;
    this.ans = ans;
}

function check_info(label, x_pos, y_pos) { //객관식 정보 구조체
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
    let first_y, second_y = 0;
    for (var i in check_list) {
        if (i == 0) //첫번째 원소의 y 좌표로 전부 통일할 것
            first_y = check_list[i].y_pos;
        else if (Math.abs(check_list[i].y_pos - first_y) < 15) //같은 줄
            check_list[i].y_pos = first_y;
        else { //다른 줄
            if (second_y == 0) //second_y가 없으면 초기화
                second_y = check_list[i].y_pos;
            check_list[i].y_pos = second_y; //두번째 줄
        }
    }
    check_list.sort(function (a, b) { //오름차순 정렬
        if (a.y_pos == b.y_pos) { //같은 줄
            if (a.x_pos > b.x_pos) return 1;
            return -1;
        } else { //다른 줄
            if (a.y_pos > b.y_pos) return 1;
            return -1;
        }
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

function finalList(ans_list) {
    let final_list = new Array();
    for (var i in ans_list) {
        let spn = Number(ans_list[i].spn); //spn 숫자화
        let checked = 1; //답을 뭐라고 했을까
        if (ans_list[i].ans.length == 1)  //길이가 1이라면 주관식
            checked = ans_list[i].ans[0];
        for (var j in ans_list[i].ans) { //객관식
            if (ans_list[i].ans[j].label == "check_box") { //체크박스
                checked += Number(j);
                break;
            }
        }
        final_list[i] = new ans_info(spn, checked); //문제번호 - 답안 쌍
    }
    return final_list;
}

exports.ans_list = function(json, index) {
    let ans = new Array();
    let cnt = 0, ans_cnt = 0; //객관식 or 주관식 개수, 페이지의 전체 문제 수
    let spn = '';
    let check_list = new Array(); //객관식 또는 주관식 답안 정보
    for (var i in json.yolo_result[index]) {
        let cur = json.yolo_result[index][i];
        let spn_list;
        if (cur.label == "spn" || cur.label == "page_num") { //한 문제가 끝난 것
            if (i > 0) {
                if (cnt > 1) //객관식 정리
                    check_list = refactoringCheck(check_list);
                ans[ans_cnt] = new ans_info(spn, check_list);
                check_list = new Array(); //초기화
                cnt = 0;
                ans_cnt++;
            }
            spn_list = new Array();
            spn_list = cur.recognition_word; //spn에서 찾은 모든 단어
            spn = findSpn(spn_list);
        } else if (cur.label == "uncheck_box" || cur.label == "check_box") { //객관식 정보 입력
            check_list[cnt] = new check_info(cur.label, cur.x, cur.y);
            cnt++;
        } else if (cur.label == "short_ans") { //주관식 정보 입력
            check_list[cnt] = Number(cur.recognition_word);
            cnt++;
        }
    }
    let final_list = finalList(ans);
    return final_list;
}