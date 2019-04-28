import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "numberZeroNo"
})
export class NumberZeroNoPipe implements PipeTransform{
  transform(value: number, args?: any): string{
    // return the number unless its then zero then return 'none'
    return value > 0 ? ""+value : "<span class=\"no\">None</span>";
  }
}
