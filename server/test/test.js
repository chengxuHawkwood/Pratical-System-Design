'use strict'
process.env.NODE_ENV = 'test'
const app = require('../index')
const nock = require('nock')

require('./authRouter.test')(app) 