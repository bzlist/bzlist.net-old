import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PlayerListPageComponent} from "./player-list-page.component";

describe("PlayerListPageComponent", () => {
  let component: PlayerListPageComponent;
  let fixture: ComponentFixture<PlayerListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerListPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
