import {NgModule} from "@angular/core";
import {
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatCheckboxModule
} from "@angular/material";

const modules = [
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatCheckboxModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
