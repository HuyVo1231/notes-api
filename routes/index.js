const loginRouter = require('./login')
const noteRouter = require('./note')
const express = require('express')

function route(app) {
  app.use('/v1', loginRouter)
  app.use('/v1', noteRouter)
}

module.exports = route
