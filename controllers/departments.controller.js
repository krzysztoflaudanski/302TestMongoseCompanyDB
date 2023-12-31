const Department = require('../models/department.model');
const { v4: isUUID } = require('uuid');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find({}));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(501).json({ message: 'Invalid UUID' });
  } else {
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  };
};

exports.post = async (req, res) => {

  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(501).json({ message: 'Invalid UUID' });
  } else {
    const { name } = req.body;
    const dep = await Department.findById(req.params.id);
    if (dep) {
      if (name) {
        dep.name = name;
      }
      await dep.save();
      res.json(dep);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  }
};

exports.delete = async (req, res) => {

  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(501).json({ message: 'Invalid UUID' });
  } else {
    const deletedDepartment = await Department.findById(req.params.id);
    if (deletedDepartment) {
      await Department.deleteOne({ _id: req.params.id });
      res.json(deletedDepartment);
      console.log(deletedDepartment)
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  }
};