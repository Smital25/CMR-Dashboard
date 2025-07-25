const express = require('express');
const router = express.Router();
const {
  getDeals,
  createDeal,
  updateDeal,
  deleteDeal
} = require('../controllers/dealController');
const protect = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getDeals);
router.post('/', createDeal);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

module.exports = router;
