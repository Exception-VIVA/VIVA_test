const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    stu_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stu_id: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    stu_pw: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    stu_nick: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    stu_grade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    stu_photo: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "https:\/\/i.ibb.co\/42SqfGY\/3dol.jpg"
    },
    salt: {
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
