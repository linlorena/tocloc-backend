const express = require('express');
const ReservationService = require('../services/ReservationService');

const router = express.Router();
const reservationService = new ReservationService();

router.get('/', async (req, res) => {
  try {
    const reservations = await reservationService.listReservations();
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/details', async (req, res) => {
  try {
    const reservationsWithDetails = await reservationService.getAllReservationsWithDetails();
    res.status(200).json(reservationsWithDetails);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar reservas com detalhes: ' + err.message });
  }
});

router.post('/', async (req, res) => {
  const { user_id, sports_place_id, reservation_date, reservation_time } = req.body;

  if (!user_id || !sports_place_id || !reservation_date || !reservation_time) {
    return res.status(400).json({ error: 'Os campos user_id, sports_place_id, reservation_date e reservation_time são obrigatórios.' });
  }

  try {
    const newReservation = await reservationService.registerReservation(req.body);
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { user_id, sports_place_id, reservation_date, reservation_time } = req.body;

  if (user_id && !reservation_date) {
    return res.status(400).json({ error: 'Se atualizar o user_id, o campo reservation_date também precisa ser informado.' });
  }

  try {
    const updatedReservation = await reservationService.updateReservation(req.params.id, req.body);
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar reserva: ' + err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await reservationService.deleteReservation(req.params.id);
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar reserva: ' + err.message });
  }
});

module.exports = router;
