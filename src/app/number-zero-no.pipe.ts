import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "numberZeroNo"
})
export class NumberZeroNoPipe implements PipeTransform{
  transform(value: number, args?: any): string{
    return value > 0 ? value : "<span class=\"no\">No</span>";
  }
}
