const SportsPlaceRepository = require('../repositories/SportsPlaceRepository');

class SportsPlaceService {
  constructor() {
    this.sportsPlaceRepository = new SportsPlaceRepository();
  }

  async listarEsportes() {
    return await this.sportsPlaceRepository.getAllSportsPlace();
  }

  async registerSportsPlace(sportsPlace) {
    const { name, location, owner_id } = sportsPlace;

    if (!name || !location || !owner_id) {
      throw new Error('Os campos name, location e owner_id são obrigatórios.');
    }

    return await this.sportsPlaceRepository.createSportsPlace(sportsPlace);
  }

  async updateSportsPlace(id, updatedData) {
    const { name, location, owner_id } = updatedData;

    if (!name && !location && !owner_id) {
      throw new Error('Pelo menos um campo (name, location, owner_id) deve ser fornecido para atualização.');
    }

    return await this.sportsPlaceRepository.updateSportsPlace(id, updatedData);
  }

  async deleteSportsPlace(id) {
    return await this.sportsPlaceRepository.deleteSportsPlace(id);
  }

  async getReservationsBySportsPlaceId(id) {
    return await this.sportsPlaceRepository.getReservationsBySportsPlaceId(id);
  }
}

module.exports = SportsPlaceService;
