import {Component, Input, HostListener, Output, EventEmitter} from "@angular/core";

@Component({
  selector: "app-dropdown-option",
  templateUrl: "./dropdown-option.component.html",
  styleUrls: ["./dropdown-option.component.scss"]
})
export class DropdownOptionComponent{
  @Input() value: string;

  @Output() click = new EventEmitter();

  constructor(){
  }

  @HostListener("click", ["$event"])
  onClick(event: UIEvent): void{
    event.preventDefault();
    event.stopPropagation();

    this.click.emit();
  }
}
