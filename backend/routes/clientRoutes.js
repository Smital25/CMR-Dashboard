const express = require('express');
const router = express.Router();
const {
  createClient,
  getClients,
  updateClient,
  deleteClient
} = require('../controllers/clientController');
const protect = require('../middleware/authMiddleware');

router.use(protect); // All routes below are protected

router.post('/', createClient);
router.get('/', getClients);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
