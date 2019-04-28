import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "booleanYesNo"
})
export class BooleanYesNoPipe implements PipeTransform{
  transform(value: boolean, args?: any): string{
    // convert boolean value to yes/no with proper class
    return value ? "<span class=\"yes\">Yes</span>" : "<span class=\"no\">No</span>";
  }
}
