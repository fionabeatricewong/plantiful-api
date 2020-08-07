const express = require('express')
const passport = require('passport')

// Require model:
const Plant = require('../models/plant')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX:
router.get('/plants', requireToken, (req, res, next) => {
  Plant.find({ owner: req.user.id })
    .then(plants => {
      return plants.map(plant => plant.toObject())
    })
    .then(plants => res.status(200).json({ plants: plants }))
    .catch(next)
})

// SHOW:
router.get('/plants/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Plant.findById(id)
    .then(handle404)
    .then(plant => res.status(200).json({ plant: plant.toObject() }))
    .catch(next)
})

// CREATE:
router.post('/plants', requireToken, (req, res, next) => {
  req.body.plant.owner = req.user.id

  // Accept data from request:
  const plant = req.body.plant
  Plant.create(plant)
    .then(plant => {
      res.status(201).json({ plant: plant.toObject() })
    })
    .catch(next)
})

// UPDATE:
router.patch('/plants/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.plant.owner
  const id = req.params.id
  const data = req.body.plant
  Plant.findById(id)
    .then(handle404)
    .then(plant => {
      requireOwnership(req, plant)
      return plant.updateOne(data)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY/DELETE:
router.delete('/plants/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Plant.findById(id)
    .then(handle404)
    .then(plant => {
      requireOwnership(req, plant)
      plant.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
