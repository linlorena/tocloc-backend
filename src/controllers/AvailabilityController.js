const express = require('express');
const AvailabilityService = require('../services/AvailabilityService');

const router = express.Router();
const availabilityService = new AvailabilityService();

router.get('/', async (req, res) => {
  try {
    const availabilities = await availabilityService.listAvailabilities();
    res.status(200).json(availabilities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { sports_place_id, available_date, start_time, end_time } = req.body;

  if (!sports_place_id || !available_date || !start_time || !end_time) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios: sports_place_id, available_date, start_time, e end_time' });
  }

  try {
    const newAvailability = await availabilityService.registerAvailability(req.body);
    res.status(201).json(newAvailability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { available_date, start_time, end_time } = req.body;

  if (!available_date || !start_time || !end_time) {
    return res.status(400).json({ error: 'Os campos available_date, start_time e end_time são obrigatórios' });
  }

  try {
    const updatedAvailability = await availabilityService.updateAvailability(req.params.id, req.body);
    res.status(200).json(updatedAvailability);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar disponibilidade: ' + err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await availabilityService.deleteAvailability(req.params.id);  
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar disponibilidade: ' + err.message });
  }
});

module.exports = router;
