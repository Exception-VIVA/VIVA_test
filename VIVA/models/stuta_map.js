const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stuta_map', {
    stuta_sn: {
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
    ta_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teacher',
        key: 'ta_sn'
      }
    }
  }, {
    sequelize,
    tableName: 'stuta_map',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stuta_sn" },
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
        name: "ta_sn",
        using: "BTREE",
        fields: [
          { name: "ta_sn" },
        ]
      },
    ]
  });
};
