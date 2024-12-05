const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

class ReservationRepository {
  async getAllReservations() {
    const { data, error } = await supabase.from('reservation').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async updateAvailabilityStatus(availabilityId) {
    const { data, error } = await supabase
      .from('availability')
      .update({ reserved: true }) 
      .eq('id', availabilityId);

    if (error) throw new Error(error.message);
    return data;
  }

  async createReservation(reservation) {
    const { data, error } = await supabase.from('reservation').insert([{
      user_id: reservation.user_id,
      sports_place_id: reservation.sports_place_id,
      reservation_date: reservation.reservation_date,
      reservation_time: reservation.reservation_time
    }]);

    if (error) throw new Error(error.message);

    if (reservation.availability_id) {
      await this.updateAvailabilityStatus(reservation.availability_id);
    }

    return data;
  }

  async updateReservation(id, updatedData) {
    const { data, error } = await supabase
      .from('reservation')
      .update(updatedData)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao atualizar reserva:', error.message);
      throw new Error(error.message);
    }

    return data;
  }

  async deleteReservation(id) {
    const { data, error } = await supabase
      .from('reservation')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  }

  async getAllReservationsWithDetails() {
    const { data, error } = await supabase
      .from('reservation')
      .select(`
        id,
        reservation_date,
        reservation_time,
        user_id (
          id,
          name,
          email
        ),
        sports_place_id (
          id,
          name,
          location
        )
      `);

    if (error) {
      console.error('Erro ao buscar reservas com detalhes:', error.message);
      throw new Error(error.message);
    }

    return data;
  }
}

module.exports = ReservationRepository;
