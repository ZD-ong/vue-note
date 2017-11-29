import {randomId} from '../helper/util'
export default (sequelize, DataTypes, Foreign) => {
  const Notebook = sequelize.define('Notebook', {
    title: DataTypes.STRING
  })
  return Notebook
}