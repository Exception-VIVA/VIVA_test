const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('incor_note', {
    note_sn: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stu_sn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    note_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    note_photo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    note_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'incor_note',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "note_sn" },
        ]
      },
    ]
  });
};
