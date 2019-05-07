import {Pipe, PipeTransform, OnDestroy, ChangeDetectorRef, NgZone} from "@angular/core";

// time constants
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

@Pipe({
  name: "timeAgo",
  pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy{
  private timer: number;

  constructor(private changeDectectorRef: ChangeDetectorRef,
              private ngZone: NgZone){
  }

  transform(value: number): string{
    // convert from timestamp to time ago
    value = new Date().getTime() / 1000 - value;
    const timeToUpdate = Number.isNaN(value) ? 1000 : this.getSecondsUntilUpdate(value) * 1000;

    let time = "just now";

    if(value < 0){
      time = "never";
    }

    if(value >= DAY * 2){
      time = `${Math.floor(value / DAY)} days ago`;
    }else if (value >= DAY){
      time = "a day ago";
    }else if (value >= HOUR * 2){
      time = `${Math.floor(value / HOUR)} hours ago`;
    }else if (value >= HOUR) {
      time = "an hour ago";
    }else if (value >= MINUTE * 2){
      time = `${Math.floor(value / MINUTE)} minutes ago`;
    }else if (value >= MINUTE){
      time = "a minute ago";
    }

    console.log(`time-ago.pipe: ${time}`);

    return time;
  }

  ngOnDestroy(): void{
    this.removeTimer();
  }

  private removeTimer(): void{
    if(this.timer){
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate(seconds: number): number{
    if(seconds < MINUTE){
      // less than 1 min, update every 10 seconds
      return 10;
    }else if(seconds < HOUR){
      // less than an hour, update every 30 seconds
      return 30;
    }else if(seconds < DAY){
      // less then a day, update every 5 minutes
      return MINUTE * 5;
    }

    // update every hour
    return HOUR;
  }
}
