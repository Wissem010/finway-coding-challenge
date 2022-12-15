import { evaluate } from "../helpers/strings.helper";

describe("evaluate", () => {
  it("should return the correct value in addition", () => {
    const response = evaluate("1+2");
    expect(response).toEqual(3);
  });
  it("should return the correct value in substraction", () => {
    const response = evaluate("1-2");
    expect(response).toEqual(-1);
  });
  it("should return the correct value in multiply", () => {
    const response = evaluate("1*2");
    expect(response).toEqual(2);
  });
  it("should return the correct value in division", () => {
    const response = evaluate("1/2");
    expect(response).toEqual(0.5);
  });
  it("should respect paranthesis", () => {
    const response = evaluate("1/2*(2-1)");
    expect(response).toEqual(0.5);
  });
  it("should throw an error when dividing by zero", () => {
    expect(() => {
      evaluate("1/0");
    }).toThrowError("Division by zero");
  });
  it("should return NaN", () => {
    const response = evaluate("this is not a number");
    expect(response).toEqual(NaN);
  });
});
