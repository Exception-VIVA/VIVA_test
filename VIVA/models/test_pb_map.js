const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test_pb_map', {
    tp_map_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    test_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'test',
        key: 'test_sn'
      }
    },
    pb_sn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'problem',
        key: 'pb_sn'
      }
    }
  }, {
    sequelize,
    tableName: 'test_pb_map',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tp_map_sn" },
        ]
      },
      {
        name: "test_sn",
        using: "BTREE",
        fields: [
          { name: "test_sn" },
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
