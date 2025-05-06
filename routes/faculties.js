const express = require('express');
const router = express.Router();
const {
  User, 
  Program,
  Organization,
  Faculty,
  Candidate,
  CandidateDetail
} = require('../models');

/* GET faculties listing. */
router.get('/', async function(req, res, next) {
  try {
    const faculties = await Faculty.findAll();
    return res.status(200).json(faculties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const faculty = await Faculty.findOne({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async function(req, res, next) {
  try {
    const { name, dean } = req.body;
    if(!name || !dean){
      return res.status(400).json({ message: 'Name and Dean are required' });
    }
    const existingFaculty = await Faculty.findOne({
      where: {
        name: name
      }
    });
    if(existingFaculty){
      return res.status(400).json({ message: 'Faculty already exists' });
    }
    const newFaculty = await Faculty.create({
      name,
      dean
    });
    return res.json({
      data: newFaculty,
      message: 'Faculty created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/:id', async function(req, res, next) {
  try {
    const { name, dean } = req.body;
    if(!name || !dean){
      return res.status(400).json({ message: 'Name and Dean are required' });
    }
    const faculty = await Faculty.findOne({
      where: {
        id: req.params.id
      }
    });
    if(!faculty){
      return res.status(404).json({ message: 'Faculty not found' });
    }
    const updatedFaculty = await Faculty.update({
      name,
      dean
    }, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      data: updatedFaculty,
      message: 'Faculty updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const faculty = await Faculty.findOne({
      where: {
        id: req.params.id
      }
    });
    if(!faculty){
      return res.status(404).json({ message: 'Faculty not found' });
    }
    await Faculty.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({
      message: 'Faculty deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
