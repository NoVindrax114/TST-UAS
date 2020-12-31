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
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
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