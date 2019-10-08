import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent{
  private _value = "";

  @Input() placeholder = "Search";

  @Output() valueChange = new EventEmitter<string>();

  @Input()
  get value(): string{
    return this._value;
  }
  set value(value: string){
    this._value = value;
    this.valueChange.emit(value);
  }

  constructor(){
  }
}
