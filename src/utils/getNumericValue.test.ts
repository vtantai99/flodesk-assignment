import { describe, it, expect } from "vitest";
import { getNumericValue } from "./getNumericValue";

describe("getNumericValue", () => {
  it("returns the parsed numeric value when input is a valid number string", () => {
    expect(getNumericValue("42", "100")).toBe("42");
    expect(getNumericValue("0", "100")).toBe("0");
    expect(getNumericValue("-10", "100")).toBe("-10");
  });

  it("returns default value when input is undefined", () => {
    expect(getNumericValue(undefined, "100")).toBe("100");
  });

  it("returns default value when input is not a valid number", () => {
    expect(getNumericValue("not a number", "100")).toBe("100");
    expect(getNumericValue("", "100")).toBe("100");
    expect(getNumericValue("abc123", "100")).toBe("100");
  });

  it("handles different default values", () => {
    expect(getNumericValue(undefined, "0")).toBe("0");
    expect(getNumericValue("not a number", "50")).toBe("50");
    expect(getNumericValue(undefined, "-1")).toBe("-1");
  });
}); 