import {NgModule} from "@angular/core";
import {MatIconModule, MatToolbarModule, MatTooltipModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatChipsModule, MatInputModule, MatMenuModule, MatMenu} from "@angular/material";

const modules = [MatIconModule, MatToolbarModule, MatTooltipModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatChipsModule, MatInputModule, MatMenuModule];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule{
}