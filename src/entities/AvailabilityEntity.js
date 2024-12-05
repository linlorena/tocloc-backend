class Availability {
  constructor(id, sports_place_id, available_date, start_time, end_time) {
    this.id = id;
    this.sports_place_id = sports_place_id;
    this.available_date = available_date;
    this.start_time = start_time;
    this.end_time = end_time;
  }
}

module.exports = Availability;
