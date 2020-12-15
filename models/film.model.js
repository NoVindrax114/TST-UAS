const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

const filmSchema = new Schema({
  no_film: {
    type: Number,
    required: true
  },
  judul: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: [
      'Belum Ditonton',
      'Sedang Ditonton',
      'Sudah Ditonton'
    ],
    required: true
  }
})

// auto increment field
autoIncrement.initialize(mongoose.connection)
filmSchema.plugin(autoIncrement.plugin, {
  model: 'Film',
  field: 'no_film',
  startAt: 1,
  incrementBy: 1
})

var film = mongoose.model('film', filmSchema)
module.exports = film