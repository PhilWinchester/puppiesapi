const express = require('express');
const router = express.Router();
const { getAllPuppies, adoptPuppy, abandonPuppy, likePuppy } = require('../../models/puppy');

// handle all the routes

// Implement POST to adopt a puppy
router.post('/', adoptPuppy, (req,res) => {
  // res.json(res.puppies || [])
  res.json(res.puppies || []);
})

// Implement PUT to like a puppy
router.put('/:id', likePuppy, (req,res) => {
  res.json(res.puppies || []);
})

// Implement DELETE to abandon a puppy :(
router.delete('/:id', abandonPuppy, (req,res) => {
  res.json(res.puppies || []);
})

// get all puppies
router.get('/', getAllPuppies, (req, res) => {
  res.json(res.puppies || []);
});


module.exports = router;
