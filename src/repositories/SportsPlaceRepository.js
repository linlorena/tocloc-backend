const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

class SportsPlaceRepository {
  async getAllSportsPlace() {
    const { data, error } = await supabase.from('sports_place').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async createSportsPlace(sportsPlace) {
    const { data, error } = await supabase.from('sports_place').insert([{
      name: sportsPlace.name,
      location: sportsPlace.location,
      owner_id: sportsPlace.owner_id 
    }]);
    if (error) throw new Error(error.message);
    return data;
  }

  async updateSportsPlace(id, updatedData) {
    const { data, error } = await supabase
      .from('sports_place')
      .update(updatedData) 
      .match({ id }) 
      .single(); 
    if (error) throw new Error(error.message);
    return data;
  }

  async deleteSportsPlace(id) {
    const { data, error } = await supabase
      .from('sports_place')
      .delete()
      .match({ id }); 
    if (error) throw new Error(error.message);
    return data;
  }

  async getReservationsBySportsPlaceId(sportsPlaceId) {
    const { data, error } = await supabase
      .from('reservation') 
      .select('*')
      .eq('sports_place_id', sportsPlaceId); 
    if (error) throw new Error(error.message);
    return data; 
  }
}

module.exports = SportsPlaceRepository;
