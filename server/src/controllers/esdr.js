const Esdr = require('../models/esdr');

const addEsdr = async (req, res) => {
  req.body.personPhoto = req.file.filename;
  await Esdr.create(req.body);
  return res.json({
    msg: 'Esdr Added',
  });
};

const getAllEsdr = async (req, res) => {
  const esdr = await Esdr.find().sort({ serialNumber: 1 }); // Sort by serialNumber
  return res.json(esdr);
};

const deleteEsdrById = async (req, res) => {
  const esdr = await Esdr.findByIdAndDelete(req.params.id);
  return res.json(esdr);
};

const getEsdrDetailsById = async (req, res) => {
  try {
    const esdr = await Esdr.findById(req.params.id);
    return res.json(esdr);
  } catch (err) {
    return res.json({
      msg: 'Unable to fetch',
    });
  }
};

module.exports = { addEsdr, getAllEsdr, deleteEsdrById, getEsdrDetailsById };
