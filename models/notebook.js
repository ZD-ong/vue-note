export default (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: DataTypes.STRING
  })
  return Notebook
}