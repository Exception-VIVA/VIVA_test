const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('problem', {
    pb_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pb_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pb_img: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    workbook_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workbook',
        key: 'workbook_sn'
      }
    },
    pbtype_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'problemtype',
        key: 'pbtype_sn'
      }
    }
  }, {
    sequelize,
    tableName: 'problem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "pb_sn" },
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
        name: "pbtype_sn",
        using: "BTREE",
        fields: [
          { name: "pbtype_sn" },
        ]
      },
    ]
  });
};
