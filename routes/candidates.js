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

/* GET candidates listing. */
router.get('/', async function(req, res, next) {
  try {
    const candidates = await Candidate.findAll({
      include: [
        {
          model: Organization,
          as: 'organization',
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
        }
      ],
    });
    return res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const candidate = await Candidate.findOne({
      include: [
        {
          model: Organization,
          as: 'organization',
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
        }
      ],
    }, {
      where: {
        id: req.params.id,
      }
    });
    return res.status(200).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async function(req, res, next) {
  try {
    const { periods, id_organization, name, description, vision, mision, photo, video  } = req.body;
    if(!periods || !id_organization || !name || !description || !vision || !mision || !photo || !video) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingCandidate = await Candidate.findOne({
      where: {
        periods: periods,
        name: name
      }
    });
    if(existingCandidate){
      return res.status(400).json({ message: 'Candidate already exists' });
    }
    const newCandidate = await Candidate.create({
      periods,
      id_organization,
      name,
      description,
      vision,
      mision,
      photo,
      video
    });
    return res.json({
      data: newCandidate,
      message: 'Candidate created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/:id', async function(req, res, next) {
  try {
    const { periods, id_organization, name, description, vision, mision, photo, video  } = req.body;
    if(!periods || !id_organization || !name || !description || !vision || !mision || !photo || !video) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const candidate = await Candidate.findOne({
      where: {
        id: req.params.id,
      }
    });
    if(!candidate){
      return res.status(404).json({ message: 'Candidate not found' });
    }
    const updatedCandidate = await Candidate.update({
      periods,
      id_organization,
      name,
      description,
      vision,
      mision,
      photo,
      video
    }, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      data: updatedCandidate,
      message: 'Candidate updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const candidate = await Candidate.findOne({
      where: {
        id: req.params.id
      }
    });
    if(!candidate){
      return res.status(404).json({ message: 'Candidate not found' });
    }
    await Candidate.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
