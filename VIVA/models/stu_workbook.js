const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stu_workbook', {
    stu_wb_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    workbook_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workbook',
        key: 'workbook_sn'
      }
    },
    stu_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
        key: 'stu_sn'
      }
    }
  }, {
    sequelize,
    tableName: 'stu_workbook',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stu_wb_sn" },
        ]
      },
      {
        name: "workbook_sn",
        using: "BTREE",
        fields: [
          { name: "workbook_sn" },
        ]
      },
      {
        name: "stu_sn",
        using: "BTREE",
        fields: [
          { name: "stu_sn" },
        ]
      },
    ]
  });
};
