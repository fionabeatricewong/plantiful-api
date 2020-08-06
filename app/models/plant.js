const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  scientificName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  soil: {
    type: String,
    required: true
  },
  sunlight: {
    type: String,
    required: true
  },
  water: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Plant', plantSchema)
