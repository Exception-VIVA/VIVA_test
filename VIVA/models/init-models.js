var DataTypes = require("sequelize").DataTypes;
var _incor_problem = require("./incor_problem");
var _problem = require("./problem");
var _problemtype = require("./problemtype");
var _recom_problem = require("./recom_problem");
var _solution = require("./solution");
var _student = require("./student");
var _stuta_map = require("./stuta_map");
var _teacher = require("./teacher");
var _workbook = require("./workbook");

function initModels(sequelize) {
  var incor_problem = _incor_problem(sequelize, DataTypes);
  var problem = _problem(sequelize, DataTypes);
  var problemtype = _problemtype(sequelize, DataTypes);
  var recom_problem = _recom_problem(sequelize, DataTypes);
  var solution = _solution(sequelize, DataTypes);
  var student = _student(sequelize, DataTypes);
  var stuta_map = _stuta_map(sequelize, DataTypes);
  var teacher = _teacher(sequelize, DataTypes);
  var workbook = _workbook(sequelize, DataTypes);

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
  recom_problem.belongsTo(problemtype, { foreignKey: "pbtype_sn"});
  problemtype.hasMany(recom_problem, { foreignKey: "pbtype_sn"});
  stuta_map.belongsTo(student, { foreignKey: "stu_sn"});
  student.hasMany(stuta_map, { foreignKey: "stu_sn"});
  stuta_map.belongsTo(teacher, { foreignKey: "ta_sn"});
  teacher.hasMany(stuta_map, { foreignKey: "ta_sn"});

  return {
    incor_problem,
    problem,
    problemtype,
    recom_problem,
    solution,
    student,
    stuta_map,
    teacher,
    workbook,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
