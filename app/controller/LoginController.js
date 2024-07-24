require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
class LoginController {
  async createAccount(req, res) {
    const { fullName, email, password } = req.body

    if (!fullName) {
      return res.status(400).json({
        error: true,
        message: 'Full name is required'
      })
    }
    if (!email) {
      return res.status(400).json({
        error: true,
        message: 'Email is required'
      })
    }
    if (!password) {
      return res.status(400).json({
        error: true,
        message: 'Password is required'
      })
    }

    const isUser = await User.findOne({ email: email })
    if (isUser) {
      return res.status(400).json({
        error: true,
        message: 'User already exists'
      })
    }

    const user = new User({
      fullName,
      email,
      password
    })

    await user.save()
    // Access token
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m'
    })
    return res.json({
      error: false,
      user,
      message: 'Account created successfully',
      accessToken
    })
  }

  async login(req, res) {
    const { email, password } = req.body

    if (!email) {
      return res.status(400).json({
        error: true,
        message: 'Email is required'
      })
    }
    if (!password) {
      return res.status(400).json({
        error: true,
        message: 'Email is required'
      })
    }

    const userInfo = await User.findOne({ email: email })
    if (!userInfo) {
      return res.status(401).json({
        error: true,
        message: 'User not found'
      })
    }

    if (userInfo.email == email && userInfo.password == password) {
      const user = { user: userInfo }

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '2h'
      })
      return res.json({
        error: false,
        email,
        message: 'Login successful',
        accessToken
      })
    } else {
      return res.status(401).json({
        error: true,
        message: 'Invalid credentials'
      })
    }
  }

  async getUser(req, res) {
    const { user } = req.user

    const isUser = await User.findOne({ _id: user._id })

    if (!isUser) {
      return res.status(401).json({
        error: true,
        message: ''
      })
    }

    return res.json({
      error: false,
      user: {
        fullName: isUser.fullName,
        email: isUser.email,
        _id: isUser._id,
        createdOn: isUser.createdOn
      },
      message: ''
    })
  }
}
module.exports = new LoginController()
