import {Component, Input, ContentChildren, QueryList, AfterViewInit, Output, EventEmitter, HostListener, OnChanges, SimpleChanges} from "@angular/core";

import {DropdownOptionComponent} from "./dropdown-option.component";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent implements AfterViewInit, OnChanges{
  @Input() label = "Select an option";
  @Input() selected: string;

  @Output() change = new EventEmitter<string>();

  @ContentChildren(DropdownOptionComponent) options: QueryList<DropdownOptionComponent>;

  selectedOption: DropdownOptionComponent;
  show = false;

  isOpen = false;

  constructor(){
  }

  ngAfterViewInit(): void{
    setTimeout(() => {
      this.selectedOption = this.options.find((option) => option.value === this.selected);
      if(this.selectedOption){
        this.label = this.selectedOption.value[0].toUpperCase() + this.selectedOption.value.slice(1);
      }

      this.options.forEach((option) => option.click.subscribe(() => this.selectOption(option)));
    });
  }

  ngOnChanges(changes: SimpleChanges): void{
    setTimeout(() => {
      this.selectedOption = this.options.find((option) => option.value === this.selected);
      if(this.selectedOption){
        this.label = this.selectedOption.value[0].toUpperCase() + this.selectedOption.value.slice(1);
      }
    });
  }

  selectOption(option: DropdownOptionComponent): void{
    this.selected = option.value;
    this.selectedOption = option;
    if(this.selectedOption){
      this.label = this.selectedOption.value[0].toUpperCase() + this.selectedOption.value.slice(1);
    }

    this.show = false;
    this.isOpen = false;
    this.change.emit(this.selectedOption.value);
  }

  @HostListener("document:click")
  onDocumentClick(): void{
    if(this.isOpen){
      this.show = false;
      this.isOpen = false;
    }else if(this.show){
      this.isOpen = true;
    }
  }
}
