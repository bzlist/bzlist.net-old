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

  static autoFormatTime(seconds: number, allowSeconds: boolean = false): string{
    let time: string = "this minute";

    if(allowSeconds){
      time = Math.floor(seconds) + " seconds ago";
    }

    if(seconds >=  86400){
      time = Math.floor(seconds / 86400) + " days ago";
    }else if(seconds >= 3600){
      time = Math.floor(seconds / 3600) + " hours ago";
    }else if(seconds >= 60){
      time = Math.floor(seconds / 60) + " minutes ago";
    }

    return time;
  }
}
