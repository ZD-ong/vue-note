export default (sequelize, DataTypes, Foreign) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    notebookId: DataTypes.INTEGER
  },{
    indexes: [{
      fields: ['notebookId']
    }
  ]})
  return Note;
}