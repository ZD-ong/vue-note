export default (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  })
  return Note;
}