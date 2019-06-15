import {NgModule} from "@angular/core";
import {
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";

const modules = [
  MatToolbarModule,
  MatTooltipModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
