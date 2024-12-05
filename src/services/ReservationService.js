const ReservationRepository = require('../repositories/ReservationRepository');

class ReservationService {
  constructor() {
    this.reservationRepository = new ReservationRepository();
  }

  async listReservations() {
    try {
      return await this.reservationRepository.getAllReservations();
    } catch (error) {
      console.error('Erro ao listar reservas:', error.message);
      throw new Error('Erro ao listar reservas');
    }
  }

  async registerReservation(reservation) {
    const { user_id, sports_place_id, reservation_date, reservation_time } = reservation;

    if (!user_id || !sports_place_id || !reservation_date || !reservation_time) {
      throw new Error('Os campos user_id, sports_place_id, reservation_date e reservation_time são obrigatórios.');
    }

    try {
      return await this.reservationRepository.createReservation(reservation);
    } catch (error) {
      console.error('Erro ao registrar reserva:', error.message);
      throw new Error('Erro ao registrar reserva');
    }
  }

  async updateReservation(id, updatedData) {
    const { user_id, sports_place_id, reservation_date, reservation_time } = updatedData;

    if (!user_id || !sports_place_id || !reservation_date || !reservation_time) {
      throw new Error('Os campos user_id, sports_place_id, reservation_date e reservation_time são obrigatórios para atualização.');
    }

    try {
      return await this.reservationRepository.updateReservation(id, updatedData);
    } catch (error) {
      console.error('Erro ao atualizar reserva:', error.message);
      throw new Error('Erro ao atualizar reserva');
    }
  }

  async deleteReservation(id) {
    try {
      return await this.reservationRepository.deleteReservation(id);
    } catch (error) {
      console.error('Erro ao deletar reserva:', error.message);
      throw new Error('Erro ao deletar reserva');
    }
  }

  async getAllReservationsWithDetails() {
    try {
      return await this.reservationRepository.getAllReservationsWithDetails();
    } catch (error) {
      console.error('Erro ao buscar reservas com detalhes:', error.message);
      throw new Error('Erro ao buscar reservas com detalhes');
    }
  }
}

module.exports = ReservationService;
