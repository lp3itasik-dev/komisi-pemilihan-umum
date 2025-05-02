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

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.findAll({
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
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
