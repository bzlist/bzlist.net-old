import {NgModule} from "@angular/core";
import {MatIconModule, MatToolbarModule, MatTooltipModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatChipsModule, MatInputModule, MatSnackBarModule} from "@angular/material";

const modules = [MatIconModule, MatToolbarModule, MatTooltipModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatChipsModule, MatInputModule, MatSnackBarModule];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule{
}