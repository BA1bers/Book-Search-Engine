const { AuthenticatioError } = require ('apollo-server-express');
const { User, Book } = require('../models')
const { signToken } = require('../utils/auth')