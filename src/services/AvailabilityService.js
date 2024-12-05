const AvailabilityRepository = require('../repositories/AvailabilityRepository');

class AvailabilityService {
  constructor() {
    this.availabilityRepository = new AvailabilityRepository();
  }

  async listAvailabilities() {
    return await this.availabilityRepository.getAllAvailabilities();
  }

  async registerAvailability(availability) {
    const { sports_place_id, available_date, start_time, end_time } = availability;

    if (!sports_place_id || !available_date || !start_time || !end_time) {
      throw new Error('sports_place_id, available_date, start_time, and end_time are required');
    }

    return await this.availabilityRepository.createAvailability(availability);
  }

  async updateAvailability(id, updatedData) {
    return await this.availabilityRepository.updateAvailability(id, updatedData);
  }

  async deleteAvailability(id) {
    return await this.availabilityRepository.deleteAvailability(id);
  }

  async getAvailabilitiesBySportsPlaceId(sportsPlaceId) {
    return await this.availabilityRepository.getAvailabilitiesBySportsPlaceId(sportsPlaceId);
  }
}

module.exports = AvailabilityService;
