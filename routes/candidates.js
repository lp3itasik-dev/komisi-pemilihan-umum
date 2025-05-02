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

module.exports = router;
