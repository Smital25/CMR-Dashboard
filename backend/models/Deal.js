const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  contact: { type: String, required: true },
  stage: {
    type: String,
    enum: ['Lead', 'Contacted', 'Proposal Sent', 'Won', 'Lost'],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
