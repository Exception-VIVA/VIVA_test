const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher', {
    ta_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ta_IC: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ta_pw: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    ta_nick: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'teacher',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ta_sn" },
        ]
      },
    ]
  });
};
