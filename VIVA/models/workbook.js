const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workbook', {
    workbook_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    workbook_title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    workbook_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    workbook_month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    workbook_publisher: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    workbook_photo: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'workbook',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "workbook_sn" },
        ]
      },
    ]
  });
};
