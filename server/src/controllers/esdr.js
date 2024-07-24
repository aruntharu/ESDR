const Esdr = require('../models/esdr');

const addEsdr = async (req, res) => {
  req.body.esdrImage = req.file.filename;
  await Esdr.create(req.body);
  return res.json({ msg: 'Esdr Added' });
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
