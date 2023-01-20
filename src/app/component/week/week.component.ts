import { Component, OnInit } from '@angular/core';
import { CalendarDay } from 'src/app/module/Calendar';
import { TimeDay } from 'src/app/module/Time';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {

  constructor() { }

  weekIndex: number = 1
  sunday!: Date;
  saturday!: Date;
  selectedColumn: number = 0

  ngOnInit(): void {
    this.getWeekDates()
    this.generateCalendar()
    this.getTimeArray()
  }

  public calendars: CalendarDay[] = [];

  showPreviousWeek(): void {
    this.weekIndex--;
    this.calendars = []
    this.getWeekDates()
    this.generateCalendar()
  }

  showNextWeek(): void {
    this.weekIndex++
    this.calendars = []
    this.getWeekDates()
    this.generateCalendar()
  }

  generateCalendar(): void {
    let dateToAdd = this.sunday;

    for (var i = 0; i < 7; i++) {
      this.calendars.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }

    console.log(this.calendars);
  }

  /**
  * getCurrentWeekDates
  * @returns date depending on the weekIndex value, 0 is for this week,  
  *   -1 is for next week, -2 for next to next week and so on.  
  *   1 is for previous week and so on.
  */
  getWeekDates(): void {
    let index = this.weekIndex * 7

    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay() + index; // First day is the day of the month - the day of the week
    var last = first + 6 + index; // last day is the first day + 6

    this.sunday = new Date(curr.setDate(first))
    this.saturday = new Date(curr.setDate(last))
  }

  times: TimeDay[] = []
  timeInterval: number = 60


  getTimeArray(): void {
    this.times = []; // time array
    var tt = 0; // start time
    var ap = ['AM', 'PM']; // AM-PM


    //loop to increment the time and push results in array
    for (var i = 0; tt < 24 * 60; i++) {
      var hh = Math.floor(tt / 60); // getting hours of day in 0-24 format

      var mm = tt % 60; // getting minutes of the hour in 0-55 format

      const currentTime: String = ('0' + (hh % 12)).slice(-2) +
        ':' +
        ('0' + mm).slice(-2) +
        ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]

      tt = tt + this.timeInterval;

      this.times.push(new TimeDay(currentTime))
    }

    console.log(this.times);
    for (let index = 0; index < this.times.length; index++) {
      this.times[index].calendarDays = [...this.calendars]
      // this.times[index].calendars.push(...this.calendars)
    }
  }

  onTimeClick(i: number, j: number): void {
    // this.times[i].bgClass = "bg-purple"
    this.times[i].isSelected = !this.times[i].isSelected
    this.times[i].calendarDays[j].isSelected = !this.times[i].calendarDays[j].isSelected

    console.log(this.times[i]);

    console.log(this.times);
    console.log(this.calendars);
  }
}

