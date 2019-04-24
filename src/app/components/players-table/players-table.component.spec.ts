import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PlayersTableComponent} from "./players-table.component";

describe("PlayersTableComponent", () => {
  let component: PlayersTableComponent;
  let fixture: ComponentFixture<PlayersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
