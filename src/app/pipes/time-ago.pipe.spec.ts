import {TimeAgoPipe} from "./time-ago.pipe";
import {ChangeDetectorRef, NgZone} from "@angular/core";
import {TestBed, inject} from "@angular/core/testing";

describe("TimeAgoPipe", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangeDetectorRef, NgZone]
    });
  });

  it("create an instance", inject([ChangeDetectorRef, NgZone], (changeDetectorRef: ChangeDetectorRef, ngZone: NgZone) => {
    const pipe = new TimeAgoPipe(changeDetectorRef, ngZone);
    expect(pipe).toBeTruthy();
  }));
});
