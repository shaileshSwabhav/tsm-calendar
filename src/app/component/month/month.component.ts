import { Component, OnInit } from '@angular/core';
import { CalendarDay } from 'src/app/module/Calendar';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {

  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public displayMonth: string = "";
  private monthIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex)
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));
    console.log(`day -> ${day}`);


    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];
    console.log(`day.getMonth() -> ${day.getMonth()}`);
    console.log(`displayMonth -> ${this.displayMonth}`);

    let startingDateOfCalendar = this.getStartDateForCalendar(day);
    console.log(`startingDateOfCalendar -> ${startingDateOfCalendar}`);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
    console.log(`this.calendar -> `, this.calendar);
  }


  private getStartDateForCalendar(selectedDate: Date): Date {
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));
    console.log(`lastDayOfPreviousMonth -> ${lastDayOfPreviousMonth}`);

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;
    console.log(`startingDateOfCalendar -> ${startingDateOfCalendar}`);

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
        console.log(`startingDateOfCalendar in dowhile -> ${startingDateOfCalendar}`);
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }


  increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

}
