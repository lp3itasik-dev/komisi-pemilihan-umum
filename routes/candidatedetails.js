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

/* GET candidatedetails listing. */
router.get('/', async function (req, res, next) {
  try {
    const candidatedetails = await CandidateDetail.findAll({
      include: [
        {
          model: Candidate,
          as: 'candidate',
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
          ]
        }
      ]
    });
    return res.status(200).json(candidatedetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const candidatedetail = await CandidateDetail.findOne({
      include: [
        {
          model: Candidate,
          as: 'candidate',
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
          ]
        }
      ]
    }, {
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json(candidatedetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async function(req, res, next) {
  try {
    const { id_candidate, name, description  } = req.body;
    if(!id_candidate || !name || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingCandidateDetail = await CandidateDetail.findOne({
      where: {
        name: name
      }
    });
    if(existingCandidateDetail){
      return res.status(400).json({ message: 'Candidate detail already exists' });
    }
    const newCandidateDetail = await CandidateDetail.create({
      id_candidate,
      name,
      description
    });
    return res.json({
      data: newCandidateDetail,
      message: 'Candidate detail created successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/:id', async function(req, res, next) {
  try {
    const { id_candidate, name, description  } = req.body;
    if(!id_candidate || !name || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const candidateDetail = await CandidateDetail.findOne({
      where: {
        id: req.params.id
      }
    });
    if(!candidateDetail){
      return res.status(404).json({ message: 'Candidate detail not found' });
    }
    const updatedCandidateDetail = await CandidateDetail.update({
      id_candidate,
      name,
      description
    },{
      where: {
        id: req.params.id
      }
    });
    return res.json({
      data: updatedCandidateDetail,
      message: 'Candidate detail updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const candidatedetail = await CandidateDetail.findOne({
      where: {
        id: req.params.id
      }
    });
    if(!candidatedetail){
      return res.status(404).json({ message: 'Candidate detail not found' });
    }
    await CandidateDetail.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({
      message: 'Candidate detail deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
