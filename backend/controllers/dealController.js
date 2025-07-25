const Deal = require('../models/Deal');

// Get all deals for authenticated user
exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find({ createdBy: req.user._id });
    res.json(deals);
  } catch (err) {
    console.error('❌ Failed to fetch deals:', err.message);
    res.status(500).json({ message: 'Failed to fetch deals', error: err.message });
  }
};

// Create a new deal
exports.createDeal = async (req, res) => {
  try {
    console.log('📥 Incoming Deal Data:', req.body);
    console.log('🔐 User:', req.user);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const deal = new Deal({
      ...req.body,
      createdBy: req.user._id,
    });

    await deal.save();
    res.status(201).json(deal);
  } catch (err) {
    console.error('❌ Error creating deal:', err.message);
    res.status(500).json({ message: 'Failed to create deal', error: err.message });
  }
};

// Update a deal
exports.updateDeal = async (req, res) => {
  try {
    const updated = await Deal.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Deal not found or unauthorized' });
    }

    res.json(updated);
  } catch (err) {
    console.error('❌ Failed to update deal:', err.message);
    res.status(500).json({ message: 'Failed to update deal', error: err.message });
  }
};

// Delete a deal
exports.deleteDeal = async (req, res) => {
  try {
    const deleted = await Deal.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Deal not found or unauthorized' });
    }

    res.json({ message: '✅ Deal deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete deal:', err.message);
    res.status(500).json({ message: 'Failed to delete deal', error: err.message });
  }
};
