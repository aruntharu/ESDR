// src/controllers/esdr.js
const Esdr = require('../models/esdr');

const addEsdr = async (req, res) => {
  try {
    req.body.esdrImage = req.file.filename;
    req.body.esdrDate = new Date(req.body.esdrDate); // Convert to Date object
    await Esdr.create(req.body);
    return res.json({ msg: 'Esdr Added' });
  } catch (err) {
    return res.status(500).json({ msg: 'Error adding Esdr', error: err });
  }
};

const getAllEsdr = async (req, res) => {
  const esdrList = await Esdr.find();
  return res.json(esdrList);
};

const deleteEsdrById = async (req, res) => {
  const esdrList = await Esdr.findByIdAndDelete(req.params.id);
  return res.json(esdrList);
};

const getEsdrDetailsById = async (req, res) => {
  try {
    const esdrList = await Esdr.findById(req.params.id);
    return res.json(esdrList);
  } catch (err) {
    return res.json({ msg: 'Unable to fetch' });
  }
};

module.exports = { addEsdr, getAllEsdr, deleteEsdrById, getEsdrDetailsById };
