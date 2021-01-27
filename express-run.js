
const path = require('path')
const express = require('express')
const myapp = express()
const loguer = require('morgan')

myapp.set('port', 80)

myapp.use(loguer('Hoala'))

myapp.use('/', express.static(path.join(__dirname, 'build')))


myapp.listen(myapp.get('port'), () => {
  console.log('Servidor corriendo por el puerto', myapp.get('port'))
})
