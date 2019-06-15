import {NgModule} from "@angular/core";
import {
  MatTooltipModule
} from "@angular/material";

const modules = [
  MatTooltipModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
