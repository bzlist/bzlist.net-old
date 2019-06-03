import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation} from "@angular/core";

@Component({
  selector: "app-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CheckboxComponent{
  private _checked: boolean = false;
  private _disabled: boolean = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  @Input()
  get checked(): boolean{
    return this._checked;
  }
  set checked(value: boolean){
    if(value === this.checked){
      return;
    }

    this._checked = value;
    this._changeDetectorRef.markForCheck();
  }

  @Input()
  get disabled(): boolean{
    return this._disabled;
  }
  set disabled(value: boolean){
    if(value === this.disabled){
      return;
    }

    this._disabled = value;
    this._changeDetectorRef.markForCheck();
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef){
  }

  toggle(){
    if(this.disabled){
      return;
    }

    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
