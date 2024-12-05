const express = require('express');
const SportsPlaceService = require('../services/SportsPlaceService');
const router = express.Router();
const sportsPlaceService = new SportsPlaceService();

router.post('/', async (req, res) => {
  const { name, location, owner_id } = req.body;

  if (!name || !location || !owner_id) {
    return res.status(400).json({ error: 'Os campos name, location e owner_id são obrigatórios.' });
  }

  try {
    const newPlace = await sportsPlaceService.registerSportsPlace(req.body);
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const esportes = await sportsPlaceService.listarEsportes();
    res.status(200).json(esportes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar esportes: ' + err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { name, location, owner_id } = req.body;

  if (!name && !location && !owner_id) {
    return res.status(400).json({ error: 'Nenhum campo foi enviado para atualização.' });
  }

  try {
    const updatedPlace = await sportsPlaceService.updateSportsPlace(req.params.id, req.body);
    res.status(200).json(updatedPlace);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar local esportivo: ' + err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await sportsPlaceService.deleteSportsPlace(req.params.id);
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar local esportivo: ' + err.message });
  }
});

router.get('/:id/reservations', async (req, res) => {
  try {
    const reservations = await sportsPlaceService.getReservationsBySportsPlaceId(req.params.id);
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar reservas: ' + err.message });
  }
});

module.exports = router;
