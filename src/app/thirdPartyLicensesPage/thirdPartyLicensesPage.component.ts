import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: "thirdpartylicenses-page",
  templateUrl: "./thirdPartyLicensesPage.component.html",
  styleUrls: ["./thirdPartyLicensesPage.component.scss"]
})
export class ThirdPartyLicensesPageComponent{
  licenses: Observable<string>;

  constructor(private http: HttpClient){
    this.licenses = http.get("3rdpartylicenses.txt", {responseType: "text"});
  }
}