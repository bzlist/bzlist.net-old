import {AutoPluralPipe} from "./auto-plural.pipe";

describe("AutoPluralPipe", () => {
  it("create an instance", () => {
    const pipe = new AutoPluralPipe();
    expect(pipe).toBeTruthy();
  });
});
