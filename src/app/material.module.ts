import {NgModule} from "@angular/core";
import {
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatCheckboxModule
} from "@angular/material";

const modules = [
  MatIconModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatCheckboxModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
