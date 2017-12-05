const  mockHost = 'http://localhost:3000'
const  realHost = ''

exports.config = function({isDev = true} = {isDev: true}) {
  let fileTxt = `
module.exports = {
  host: "${isDev?mockHost:realHost}"
}
`

  require('fs').writeFile(require('path').join(__dirname, '../src/helpers/host.config.js'), fileTxt)
}