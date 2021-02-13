const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('solution', {
    sol_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pb_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'problem',
        key: 'pb_sn'
      }
    },
    sol_ans: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sol_img: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'solution',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sol_sn" },
        ]
      },
      {
        name: "pb_sn",
        using: "BTREE",
        fields: [
          { name: "pb_sn" },
        ]
      },
    ]
  });
};
