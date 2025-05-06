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
const { Op } = require('sequelize');

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

router.get('/:id', async function(req, res, next) {
  try {
    const user = await User.findOne({
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
    }, {
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async function(req, res, next) {
  try {
    const { identity, name, username, password, role, id_program, classes, status } = req.body;
    if(!identity || !name || !username || !password || !role || !id_program || !classes) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({
      where: {
        identity: identity,
      }
    });
    if(existingUser){
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await User.create({
      identity,
      name,
      username,
      password,
      role,
      id_program,
      classes,
      status
    });
    return res.json({
      data: newUser,
      message: "User created successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch('/:id', async function(req, res, next) {
  try {
    const { identity, name, username, password, role, id_program, classes, status } = req.body;
    if(!identity || !name || !username || !password || !role || !id_program || !classes) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({
      where: {
        identity,
        username,
        id: { [Op.ne]: req.params.id }
      }
    });
    if(!existingUser){
      return res.status(400).json({ message: "Identity sudah digunakan" });
    }
    const updatedUser = await User.update({
      identity,
      name,
      username,
      password,
      role,
      id_program,
      classes,
      status
    }, {
      where: {
        id: req.params.id
      }
    });
    return res.json({
      data: updatedUser,
      message: "User updated successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
