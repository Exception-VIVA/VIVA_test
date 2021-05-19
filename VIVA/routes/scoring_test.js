// //var models = require('../models');
// const express = require('express');
// const router = express.Router();
// //var Op = models.Sequelize.Op;
//
// let test_json = {
//     "yolo_result": [
//         [
//             {
//                 "confidence": 0.49662092328071594,
//                 "h": 29,
//                 "label": "spn",
//                 "recognition_word": [
//                     "5.",
//                     "함께",
//                     "이의"
//                 ],
//                 "w": 26,
//                 "x": 221,
//                 "y": 305
//             },
//             {
//                 "confidence": 0.6412213444709778,
//                 "h": 30,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 23,
//                 "x": 448,
//                 "y": 356
//             },
//             {
//                 "confidence": 0.9791000485420227,
//                 "h": 33,
//                 "label": "check_box",
//                 "recognition_word": "null",
//                 "w": 27,
//                 "x": 516,
//                 "y": 353
//             },
//             {
//                 "confidence": 0.9969918727874756,
//                 "h": 31,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 27,
//                 "x": 298,
//                 "y": 358
//             },
//             {
//                 "confidence": 0.9950616955757141,
//                 "h": 29,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 225,
//                 "y": 361
//             },
//             {
//                 "confidence": 0.9658781290054321,
//                 "h": 32,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 23,
//                 "x": 372,
//                 "y": 358
//             },
//             {
//                 "confidence": 0.8076626062393188,
//                 "h": 35,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 26,
//                 "x": 444,
//                 "y": 355
//             },
//             {
//                 "confidence": 0.9983763694763184,
//                 "h": 31,
//                 "label": "spn",
//                 "recognition_word": [
//                     "6."
//                 ],
//                 "w": 20,
//                 "x": 216,
//                 "y": 876
//             },
//             {
//                 "confidence": 0.9993342161178589,
//                 "h": 28,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 22,
//                 "x": 377,
//                 "y": 920
//             },
//             {
//                 "confidence": 0.9456622004508972,
//                 "h": 30,
//                 "label": "check_box",
//                 "recognition_word": "null",
//                 "w": 20,
//                 "x": 452,
//                 "y": 918
//             },
//             {
//                 "confidence": 0.9765012264251709,
//                 "h": 30,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 23,
//                 "x": 520,
//                 "y": 918
//             },
//             {
//                 "confidence": 0.9873315691947937,
//                 "h": 26,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 23,
//                 "x": 224,
//                 "y": 924
//             },
//             {
//                 "confidence": 0.9980226159095764,
//                 "h": 29,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 301,
//                 "y": 923
//             },
//             {
//                 "confidence": 0.9917891621589661,
//                 "h": 29,
//                 "label": "spn",
//                 "recognition_word": [
//                     "7. 갑",
//                     "나누"
//                 ],
//                 "w": 23,
//                 "x": 617,
//                 "y": 292
//             },
//             {
//                 "confidence": 0.5403274297714233,
//                 "h": 27,
//                 "label": "check_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 919,
//                 "y": 355
//             },
//             {
//                 "confidence": 0.489875853061676,
//                 "h": 27,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 26,
//                 "x": 845,
//                 "y": 357
//             },
//             {
//                 "confidence": 0.7399329543113708,
//                 "h": 31,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 772,
//                 "y": 355
//             },
//             {
//                 "confidence": 0.9864771366119385,
//                 "h": 27,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 22,
//                 "x": 697,
//                 "y": 360
//             },
//             {
//                 "confidence": 0.7380515336990356,
//                 "h": 28,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 772,
//                 "y": 359
//             },
//             {
//                 "confidence": 0.8078229427337646,
//                 "h": 30,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 843,
//                 "y": 358
//             },
//             {
//                 "confidence": 0.9524815678596497,
//                 "h": 30,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 628,
//                 "y": 359
//             },
//             {
//                 "confidence": 0.9998494386672974,
//                 "h": 24,
//                 "label": "spn",
//                 "recognition_word": [
//                     "8",
//                     "TE",
//                     "값디"
//                 ],
//                 "w": 19,
//                 "x": 623,
//                 "y": 877
//             },
//             {
//                 "confidence": 0.9355486631393433,
//                 "h": 25,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 24,
//                 "x": 632,
//                 "y": 924
//             },
//             {
//                 "confidence": 0.9283306002616882,
//                 "h": 24,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 22,
//                 "x": 784,
//                 "y": 927
//             },
//             {
//                 "confidence": 0.9951590895652771,
//                 "h": 29,
//                 "label": "check_box",
//                 "recognition_word": "null",
//                 "w": 27,
//                 "x": 933,
//                 "y": 922
//             },
//             {
//                 "confidence": 0.9982066750526428,
//                 "h": 25,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 23,
//                 "x": 859,
//                 "y": 927
//             },
//             {
//                 "confidence": 0.9965254068374634,
//                 "h": 27,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 23,
//                 "x": 706,
//                 "y": 926
//             },
//             {
//                 "confidence": 0.9998050928115845,
//                 "h": 58,
//                 "label": "page_num",
//                 "recognition_word": [
//                     "2",
//                     "12"
//                 ],
//                 "w": 100,
//                 "x": 571,
//                 "y": 1369
//             }
//         ],
//         [
//             {
//                 "confidence": 0.9545009136199951,
//                 "h": 34,
//                 "label": "spn",
//                 "recognition_word": [
//                     "15.",
//                     "'"
//                 ],
//                 "w": 34,
//                 "x": 246,
//                 "y": 327
//             },
//             {
//                 "confidence": 0.9995765089988708,
//                 "h": 32,
//                 "label": "check_box",
//                 "recognition_word": "null",
//                 "w": 28,
//                 "x": 472,
//                 "y": 385
//             },
//             {
//                 "confidence": 0.9992914199829102,
//                 "h": 31,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 26,
//                 "x": 332,
//                 "y": 387
//             },
//             {
//                 "confidence": 0.9866571426391602,
//                 "h": 31,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 26,
//                 "x": 535,
//                 "y": 388
//             },
//             {
//                 "confidence": 0.9821200966835022,
//                 "h": 30,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 395,
//                 "y": 390
//             },
//             {
//                 "confidence": 0.886322021484375,
//                 "h": 34,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 29,
//                 "x": 255,
//                 "y": 388
//             },
//             {
//                 "confidence": 0.9477755427360535,
//                 "h": 39,
//                 "label": "spn",
//                 "recognition_word": [
//                     "16"
//                 ],
//                 "w": 31,
//                 "x": 643,
//                 "y": 314
//             },
//             {
//                 "confidence": 0.9959980845451355,
//                 "h": 33,
//                 "label": "check_box",
//                 "recognition_word": "null",
//                 "w": 26,
//                 "x": 660,
//                 "y": 438
//             },
//             {
//                 "confidence": 0.986635684967041,
//                 "h": 33,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 726,
//                 "y": 443
//             },
//             {
//                 "confidence": 0.9996821880340576,
//                 "h": 32,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 25,
//                 "x": 798,
//                 "y": 444
//             },
//             {
//                 "confidence": 0.9521277546882629,
//                 "h": 34,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 24,
//                 "x": 868,
//                 "y": 446
//             },
//             {
//                 "confidence": 0.9830648303031921,
//                 "h": 30,
//                 "label": "uncheck_box",
//                 "recognition_word": "null",
//                 "w": 26,
//                 "x": 930,
//                 "y": 450
//             },
//             {
//                 "confidence": 0.6277336478233337,
//                 "h": 51,
//                 "label": "page_num",
//                 "recognition_word": [
//                     "",
//                     "12"
//                 ],
//                 "w": 73,
//                 "x": 597,
//                 "y": 1367
//             }
//         ]
//     ]
// }
//
// function ans_info(spn, ans){ //문제정보 구조체
//     this.spn = spn;
//     this.ans = ans;
// }
//
// function check_info(label, x_pos, y_pos){
//     this.label = label;
//     this.x_pos = x_pos;
//     this.y_pos = y_pos;
// }
//
// function findSpn(spn_list){ //spn만 찾음
//     let spn = '';
//     for(var i in spn_list[0]){
//         if(spn_list[0][i]>='0'&&spn_list[0][i]<='9')
//             spn+=spn_list[0][i];
//     }
//     return spn;
// }
//
// function refactoringCheck(check_list){ //객관식 답안 중복 제거하고 정렬
//     let first_y, second_y;
//     for(var i in check_list){
//         if(i==0) //첫번째 원소의 y 좌표로 전부 통일할 것
//             first_y = check_list[i].y_pos;
//         else if(Math.abs(check_list[i].y_pos-first_y)<15) //나중에 두줄짜리일 때를 대비
//             check_list[i].y_pos = first_y;
//     }
//     check_list.sort(function(a, b){ //오름차순 정렬
//         if(a.x_pos>b.x_pos) return 1;
//         return -1;
//     })
//     for(var i in check_list){
//         if(i==0)
//             continue;
//         if(Math.abs(check_list[i].x_pos-check_list[i-1].x_pos)<10){ //이전 것과 x_pos 차이 거의 없으면 중복
//             check_list.splice(i, 1);
//             i--;
//         }
//     }
//     return check_list;
// }
//
// function makeList(index){
//     let ans = new Array();
//     let cnt = 0, ans_cnt = 0;
//     let spn = '';
//     let check_list = new Array(); //객관식 또는 주관식 답안 정보
//     for(var i in test_json.yolo_result[index]){
//         let cur = test_json.yolo_result[index][i];
//         let spn_list;
//         if(cur.label=="spn"||cur.label=="page_num") {
//             if(i>0){
//                 check_list = refactoringCheck(check_list);
//                 ans[ans_cnt] = new ans_info(spn, check_list);
//                 check_list = new Array(); //초기화
//                 cnt = 0;
//                 ans_cnt++;
//             }
//             spn_list = new Array();
//             spn_list = cur.recognition_word; //spn에서 찾은 모든 단어
//             spn = findSpn(spn_list);
//         }
//         else if(cur.label=="uncheck_box"||cur.label=="check_box"){
//             check_list[cnt] = new check_info(cur.label, cur.x, cur.y);
//             cnt++;
//         }
//     }
//     return ans;
// }
//
// function finalList(ans_list){ //주관식 해야함
//     let final_list = new Array();
//     for(var i in ans_list){
//         let spn = Number(ans_list[i].spn);
//         let checked = 1;
//         for(var j in ans_list[i].ans){
//             if(ans_list[i].ans[j].label=="check_box"){
//                 checked += Number(j);
//                 break;
//             }
//         }
//         final_list[i] = new ans_info(spn, checked);
//     }
//     return final_list;
// }
//
// let ans_list = makeList(0);
// let final_list = finalList(ans_list); //실제로 채점할 최종
// console.log(final_list);
//
// module.exports = router;