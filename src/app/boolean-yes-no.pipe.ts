import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "booleanYesNo"
})
export class BooleanYesNoPipe implements PipeTransform{
  transform(value: boolean, args?: any): string{
    return value ? "<span class=\"yes\">Yes</span>" : "<span class=\"no\">No</span>";
  }
}
