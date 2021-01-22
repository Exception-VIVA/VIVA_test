const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('incor_problem', {
    incor_pb_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stu_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
        key: 'stu_sn'
      }
    },
    pb_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'problem',
        key: 'pb_sn'
      }
    },
    sol_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'solution',
        key: 'sol_sn'
      }
    }
  }, {
    sequelize,
    tableName: 'incor_problem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "incor_pb_sn" },
        ]
      },
      {
        name: "stu_sn",
        using: "BTREE",
        fields: [
          { name: "stu_sn" },
        ]
      },
      {
        name: "pb_sn",
        using: "BTREE",
        fields: [
          { name: "pb_sn" },
        ]
      },
      {
        name: "sol_sn",
        using: "BTREE",
        fields: [
          { name: "sol_sn" },
        ]
      },
    ]
  });
};
