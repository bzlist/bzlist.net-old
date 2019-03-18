import {MatIconModule, MatToolbarModule, MatTooltipModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatChipsModule, MatInputModule} from "@angular/material";
import {NgModule} from "@angular/core";

const modules = [MatIconModule, MatToolbarModule, MatTooltipModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatChipsModule, MatInputModule];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule{}