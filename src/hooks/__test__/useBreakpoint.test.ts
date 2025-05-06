import { renderHook, act } from "@testing-library/react";
import { useBreakpoint } from "../useBreakpoint";

describe("useBreakpoint", () => {
  const originalInnerWidth = window.innerWidth;

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    // Trigger resize event after restore
    window.dispatchEvent(new Event("resize"));
  });

  it("should return true if window width is less than or equal to breakpoint", () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useBreakpoint(768));

    expect(result.current).toBe(true);
  });

  it("should return false if window width is greater than breakpoint", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useBreakpoint(768));

    expect(result.current).toBe(false);
  });

  it("should update when the window is resized", () => {
    window.innerWidth = 1024;
    const { result } = renderHook(() => useBreakpoint(768));

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 600;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);
  });
});
