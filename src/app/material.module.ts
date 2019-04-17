import {NgModule} from "@angular/core";
import {MatIconModule, MatToolbarModule, MatTooltipModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSnackBarModule, MatSlideToggleModule, MatMenuModule} from "@angular/material";

const modules = [MatIconModule, MatToolbarModule, MatTooltipModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatSnackBarModule, MatSlideToggleModule, MatMenuModule];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule{
}
