export class Time{
  static format(timestamp: number): string{
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
    // const dateTime = new Date(timestamp * 1000);
    // return `${dateTime.getUTCMonth()}/${dateTime.getUTCDay()}/${dateTime.getUTCFullYear()} ${dateTime.getUTCHours()}:${dateTime.getUTCMinutes()}:${dateTime.getUTCSeconds()}`;
  }

  static autoFormatTime(seconds: number): string{
    let time: string = seconds + " seconds";
  
    if(seconds >= 3600){
      time = Math.floor(seconds / 3600) + " hours";
    }else if(seconds >= 60){
      time = Math.floor(seconds / 60) + " minutes";
    }
  
    return time;
  }
}