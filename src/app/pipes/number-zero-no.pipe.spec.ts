import {NumberZeroNoPipe} from "./number-zero-no.pipe";

describe("NumberZeroNoPipe", () => {
  it("create an instance", () => {
    const pipe = new NumberZeroNoPipe();
    expect(pipe).toBeTruthy();
  });
});
