import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "autoPlural"
})
export class AutoPluralPipe implements PipeTransform{
  transform(value: any, ...args: any[]): any{
    return value.split(" ")[0] === "1" ? value : `${value}s`;
  }
}
