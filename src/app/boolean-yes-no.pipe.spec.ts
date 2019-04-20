import {BooleanYesNoPipe} from "./boolean-yes-no.pipe";

describe("BooleanYesNoPipe", () => {
  it("create an instance", () => {
    const pipe = new BooleanYesNoPipe();
    expect(pipe).toBeTruthy();
  });
});
