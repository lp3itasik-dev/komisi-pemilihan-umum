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

/* GET organizations listing. */
router.get('/', async function(req, res, next) {
  try {
    const organizations = await Organization.findAll({
      include: [
        {
          model: Program,
          as: 'program',
          include: [
            {
              model: Faculty,
              as: 'faculty',
            }
          ]
        }
      ]
    });
    return res.status(200).json(organizations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async function(req, res, next) {
  try {
    const { id_program, name, description } = req.body;
    if(!id_program || !name || !description){
      return res.status(400).json({ message: 'Program ID, Name and Description are required' });
    }
    const existingProgram = await Program.findOne({
      where: {
        id: id_program
      }
    });
    if(!existingProgram){
      return res.status(400).json({ message: 'Program does not exist' });
    }
    const existingOrganization = await Organization.findOne({
      where: {
        name: name
      }
    });
    if(existingOrganization){
      return res.status(400).json({ message: 'Organization already exists' });
    }
    const newOrganization = await Organization.create({
      id_program: id_program,
      name: name,
      description: description,
    });
    return res.json({
      data: newOrganization,
      message: 'Organization created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
