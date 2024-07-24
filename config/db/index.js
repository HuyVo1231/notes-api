require('dotenv').config()
const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect(process.env.connectionString, {})
    console.log('Đã kết nối thành công đến MonggoDB')
  } catch (error) {
    console.log('Kết nối thất bại đến MonggoDB')
  }
}

module.exports = { connect }
