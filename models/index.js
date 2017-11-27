
import Sequelize from 'sequelize'
const env     = process.env.NODE_ENV || 'development'
const config  = require(__dirname + '/../config/config.json')[env]
const sequelize = new Sequelize(config)

import Note from './note'
import Notebook from './notebook'
import User from './user'

const model      = {}

model.Note = Note(sequelize, Sequelize)
model.Notebook = Notebook(sequelize, Sequelize)
model.User = User(sequelize, Sequelize)

sequelize.sync()
export default model
