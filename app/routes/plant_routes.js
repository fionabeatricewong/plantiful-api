const express = require('express')
// instantiate a router (mini app that only handles routes)
const router = express.Router()

// Require model:
const Plant = require('./../models/plant')

// INDEX:
router.get('/plants', (req, res) => {
  Plant.find()
    .then(plants => res.json({ plants: plants }))
    .catch(console.error)
})

// SHOW:
router.get('/plants/:id', (req, res) => {
  const id = req.params.id
  Plant.findById(id)
    .then(plant => res.json({ plant: plant }))
})

// CREATE:
router.post('/plants', (req, res) => {
  // Accept data from request:
  const plant = req.body.plant
  Plant.create(plant)
    .then(plant => res.status(201).json({ plant: plant }))
    .catch(console.error)
})

// DESTROY/DELETE:
router.delete('/plants/:id', (req, res) => {
  const id = req.params.id
  Plant.findById(id)
    .then(plant => plant.remove())
    .then(res.sendStatus(204))
    .catch(console.error)
})

// UPDATE:
router.patch('/plants/:id', (req, res) => {
  const id = req.params.id
  const data = req.body.plant
  Plant.findById(id)
    .then(plant => plant.updateOne(data))
    .then(res.sendStatus(200))
    .catch(console.error)
})

module.exports = router
