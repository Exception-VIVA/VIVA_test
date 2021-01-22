const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    stu_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stu_ID: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    stu_pw: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    stu_nick: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    studentcol: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stu_sn" },
        ]
      },
    ]
  });
};
