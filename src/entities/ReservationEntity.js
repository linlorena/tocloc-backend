class Reservation {
  constructor(id, user_id, sports_place_id, reservation_date, reservation_time) {
    this.id = id;
    this.user_id = user_id;
    this.sports_place_id = sports_place_id;
    this.reservation_date = reservation_date;
    this.reservation_time = reservation_time;
  }
}

module.exports = Reservation;
