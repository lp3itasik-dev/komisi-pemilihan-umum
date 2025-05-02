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

module.exports = router;
