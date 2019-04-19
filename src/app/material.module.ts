import {NgModule} from "@angular/core";
import {
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatSnackBarModule,
  MatCheckboxModule
} from "@angular/material";

const modules = [
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatSnackBarModule,
  MatCheckboxModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
