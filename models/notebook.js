'use strict';
module.exports = (sequelize, DataTypes) => {
  var notebook = sequelize.define('notebook', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return notebook;
};