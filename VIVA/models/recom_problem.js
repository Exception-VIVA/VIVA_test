const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recom_problem', {
    recom_pb_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    recom_pb_pimg: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    recom_pb_simg: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    recom_pb_ans: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'recom_problem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recom_pb_sn" },
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
