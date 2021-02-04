var DataTypes = require("sequelize").DataTypes;
var _incor_note = require("./incor_note");
var _incor_problem = require("./incor_problem");
var _problem = require("./problem");
var _problemtype = require("./problemtype");
var _solution = require("./solution");
var _stu_workbook = require("./stu_workbook");
var _student = require("./student");
var _stuta_map = require("./stuta_map");
var _teacher = require("./teacher");
var _workbook = require("./workbook");

function initModels(sequelize) {
  var incor_note = _incor_note(sequelize, DataTypes);
  var incor_problem = _incor_problem(sequelize, DataTypes);
  var problem = _problem(sequelize, DataTypes);
  var problemtype = _problemtype(sequelize, DataTypes);
  var solution = _solution(sequelize, DataTypes);
  var stu_workbook = _stu_workbook(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var stuta_map = _stuta_map(sequelize, DataTypes);
  var teacher = _teacher(sequelize, DataTypes);
  var workbook = _workbook(sequelize, DataTypes);

  incor_problem.belongsTo(incor_note, { foreignKey: "note_sn"});
  incor_note.hasMany(incor_problem, { foreignKey: "note_sn"});
  incor_problem.belongsTo(problem, { foreignKey: "pb_sn"});
  problem.hasMany(incor_problem, { foreignKey: "pb_sn"});
  incor_problem.belongsTo(solution, { foreignKey: "sol_sn"});
  solution.hasMany(incor_problem, { foreignKey: "sol_sn"});
  incor_problem.belongsTo(student, { foreignKey: "stu_sn"});
  student.hasMany(incor_problem, { foreignKey: "stu_sn"});
  problem.belongsTo(problemtype, { foreignKey: "pbtype_sn"});
  problemtype.hasMany(problem, { foreignKey: "pbtype_sn"});
  problem.belongsTo(workbook, { foreignKey: "workbook_sn"});
  workbook.hasMany(problem, { foreignKey: "workbook_sn"});
  stu_workbook.belongsTo(student, { foreignKey: "stu_sn"});
  student.hasMany(stu_workbook, { foreignKey: "stu_sn"});
  stu_workbook.belongsTo(workbook, { foreignKey: "workbook_sn"});
  workbook.hasMany(stu_workbook, { foreignKey: "workbook_sn"});
  stuta_map.belongsTo(student, { foreignKey: "stu_sn"});
  student.hasMany(stuta_map, { foreignKey: "stu_sn"});
  stuta_map.belongsTo(teacher, { foreignKey: "ta_sn"});
  teacher.hasMany(stuta_map, { foreignKey: "ta_sn"});

  return {
    incor_note,
    incor_problem,
    problem,
    problemtype,
    solution,
    stu_workbook,
    student,
    stuta_map,
    teacher,
    workbook,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
