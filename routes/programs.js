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

/* GET programs listing. */
router.get('/', async function(req, res, next) {
  try {
    const programs = await Program.findAll({
      include: [
        {
          model: Faculty,
          as: 'faculty',
        }
      ],
    });
    return res.status(200).json(programs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async function(req, res, next) {
  try {
    const { id_faculty, name, headofprogram } = req.body;
    if(!id_faculty || !name || !headofprogram){
      return res.status(400).json({ message: "Faculty ID, Name and Head of Program are required" });
    }
    const existingFaculty = await Faculty.findOne({
      where: {
        id: id_faculty
      }
    });
    if(!existingFaculty){
      return res.status(400).json({ message: "Faculty does not exist" });
    }
    const existingProgram = await Program.findOne({
      where: {
        name: name
      }
    });
    if(existingProgram){
      return res.status(400).json({ message: "Program already exists" });
    }
    const newProgram = await Program.create({
      id_faculty: id_faculty,
      name: name,
      headofprogram: headofprogram,
    });
    return res.json({
      data: newProgram,
      message: "Program program successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
