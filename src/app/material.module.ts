import {NgModule} from "@angular/core";
import {
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule
} from "@angular/material";

const modules = [
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
