import {Pipe, PipeTransform} from "@angular/core";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

@Pipe({
  name: "timeAgo",
  pure: false
})
export class TimeAgoPipe implements PipeTransform{
  transform(value: number, args?: any): string{
    if(value < 0){
      return "never";
    }

    value = new Date().getTime() / 1000 - value;

    let time: string = "just now";

    if(value >= DAY * 2){
      time = `${Math.floor(value / DAY)} days ago`;
    }else if(value >= DAY){
      time = "a day ago";
    }else if(value >= HOUR * 2){
      time = `${Math.floor(value / HOUR)} hours ago`;
    }else if(value >= HOUR){
      time = "an hour ago";
    }else if(value >= MINUTE * 2){
      time = `${Math.floor(value / MINUTE)} minutes ago`;
    }else if(value >= MINUTE){
      time = "a minute ago";
    }

    return time;
  }
}
