import {Component, OnInit} from "@angular/core";

import {SettingsService} from "../../services/settings.service";
import {SeoService} from "../../services/seo.service";

@Component({
  selector: "app-settings-page",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"]
})
export class SettingsPageComponent implements OnInit{
  mobile: boolean = false;

  constructor(public settingsService: SettingsService,
              public seo: SeoService){
    // check if the window width is smaller then the mobile threshold
    try{
      if(window.innerWidth <= 768){
        this.mobile = true;
      }
    }catch(err){
    }
  }

  get darkMode(): boolean{
    try{
      return this.settingsService.darkMode;
    }catch(err){
      return false;
    }
  }

  set darkMode(value: boolean){
    this.settingsService.darkMode = value;

    // and transition to document
    document.documentElement.classList.add("transition");
    setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 300);

    // set data-theme
    if(value){
      document.documentElement.setAttribute("data-theme", "dark");
    }else{
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  ngOnInit(){
    this.seo.generateTags({
      title: "Settings - BZList",
      description: "Change various settings to customize your experience"
    });
  }

  serverColumnName(column: string): string{
    return this.settingsService.serverColumnNames[this.settingsService.serverColumns.indexOf(column)];
  }

  playerColumnName(column: string): string{
    return this.settingsService.playerColumnNames[this.settingsService.playerColumns.indexOf(column)];
  }

  getServerColumn(column: string): boolean{
    return this.settingsService.displayedServerColumns.includes(column);
  }

  getPlayerColumn(column: string): boolean{
    return this.settingsService.displayedPlayerColumns.includes(column);
  }

  toggleServerColumn(column: string): void{
    this.settingsService.toggleDisplayedServerColumn(column);
  }

  togglePlayerColumn(column: string): void{
    this.settingsService.toggleDisplayedPlayerColumn(column);
  }
}
