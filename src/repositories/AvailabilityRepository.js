class AvailabilityRepository {
  // Listar todas as disponibilidades
  async getAllAvailabilities() {
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('status', 'disponivel');  // Verifique se o campo 'status' existe e é relevante, caso contrário, remova

    if (error) throw new Error(error.message);
    return data;
  }

  // Criar uma nova disponibilidade
  async createAvailability(availability) {
    const { data, error } = await supabase
      .from('availability')
      .insert([{
        sports_place_id: availability.sports_place_id,
        available_date: availability.available_date,
        start_time: availability.start_time,
        end_time: availability.end_time
      }]);

    if (error) throw new Error(error.message);
    return data;
  }

  // Atualizar uma disponibilidade existente
  async updateAvailability(id, updatedData) {
    const { data, error } = await supabase
      .from('availability')
      .update(updatedData)
      .match({ id })
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Deletar uma disponibilidade
  async deleteAvailability(id) {
    const { data, error } = await supabase
      .from('availability')
      .delete()
      .match({ id });

    if (error) throw new Error(error.message);
    return data;
  }
}

module.exports = AvailabilityRepository;
