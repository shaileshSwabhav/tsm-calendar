import { CalendarDay } from "./Calendar"

export class TimeDay {
  public time: String
  public title: string = ""
  public bgClass: string = ""
  public isSelected?: boolean
  public calendarDays: CalendarDay[]

  public getTimeString() {
    return this.time
  }

  constructor(d: String) {
    this.time = d
    this.bgClass = "bg-white"
    this.isSelected = false
    this.calendarDays = []
  }
}