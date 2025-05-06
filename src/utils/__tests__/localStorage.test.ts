import { vi } from "vitest";
import { setLocalStorage, getLocalStorage, removeLocalStorage, clearLocalStorage } from "../localStorage";

describe("LocalStorage Utils", () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should set item in localStorage", () => {
    const mockKey = "testKey";
    const mockValue = { name: "test" };

    setLocalStorage(mockKey, mockValue);

    expect(localStorage.setItem).toHaveBeenCalledWith(mockKey, JSON.stringify(mockValue));
  });

  it("should get item from localStorage", () => {
    const mockKey = "testKey";
    const mockValue = { name: "test" };
    vi.mocked(localStorage.getItem).mockReturnValueOnce(JSON.stringify(mockValue));

    const result = getLocalStorage(mockKey);

    expect(localStorage.getItem).toHaveBeenCalledWith(mockKey);
    expect(result).toEqual(mockValue);
  });

  it("should return null if item is not found in localStorage", () => {
    const mockKey = "testKey";
    vi.mocked(localStorage.getItem).mockReturnValueOnce(null);

    const result = getLocalStorage(mockKey);

    expect(localStorage.getItem).toHaveBeenCalledWith(mockKey);
    expect(result).toBeNull();
  });

  it("should return null if JSON.parse fails in getLocalStorage", () => {
    const mockKey = "testKey";
    vi.mocked(localStorage.getItem).mockReturnValueOnce("invalid JSON");

    const result = getLocalStorage(mockKey);

    expect(localStorage.getItem).toHaveBeenCalledWith(mockKey);
    expect(result).toBeNull();
  });

  it("should remove item from localStorage", () => {
    const mockKey = "testKey";

    removeLocalStorage(mockKey);

    expect(localStorage.removeItem).toHaveBeenCalledWith(mockKey);
  });

  it("should clear localStorage", () => {
    clearLocalStorage();

    expect(localStorage.clear).toHaveBeenCalled();
  });

  it("should log error when JSON.stringify fails in setLocalStorage", () => {
    const mockKey = "testKey";
    const mockValue = { circular: {} };
    mockValue.circular = mockValue;
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    setLocalStorage(mockKey, mockValue);

    expect(spy).toHaveBeenCalledWith(`Error setting localStorage key "${mockKey}":`, expect.any(Error));

    spy.mockRestore();
  });
});
