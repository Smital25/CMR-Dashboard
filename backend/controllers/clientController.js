const Client = require('../models/Client');

exports.createClient = async (req, res) => {
  try {
    const newClient = new Client({ ...req.body, createdBy: req.user });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ message: 'Create failed' });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find({ createdBy: req.user });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed' });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
