const moment = require('moment');

class MyDate {
  constructor(date) {
    this.date = moment(date);
  }

  listOfOneWeekFrom(date = null) {
    if (date == null) {
      date = this.date;
    }

    const dayOne = date.clone().add(1, 'day');
    const dayTwo = date.clone().add(2, 'day');
    const dayThree = date.clone().add(3, 'day');
    const dayFour = date.clone().add(4, 'day');
    const dayFive = date.clone().add(5, 'day');
    const daySix = date.clone().add(6, 'day');
    const daySeven = date.clone().add(7, 'day');

    return [dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven];
  }

  listOfOneWeekAfter(week) {
    const date = this.addWeek(week);

    return this.listOfOneWeekFrom(date);
  }

  addWeek(week) {
    return this.date.clone().add(week, 'week');
  }

  findFirstDay() {}

  getDay() {
    return this.date.format('dddd');
  }

  getMonth() {
    return this.date.format('mm');
  }
}

module.exports = MyDate;
