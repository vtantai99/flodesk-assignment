import { vi } from "vitest";
import { downloadHtmlFile } from "../downloadHtmlFile";

describe("downloadHtmlFile", () => {
  it("should trigger a download with the correct filename and content", () => {
    const createElementSpy = vi.spyOn(document, "createElement").mockReturnValue({
      click: vi.fn(),
      setAttribute: vi.fn(),
    } as unknown as HTMLAnchorElement);

    const createObjectURLSpy = vi.fn().mockReturnValue("mocked-url");
    const revokeObjectURLSpy = vi.fn();

    global.URL.createObjectURL = createObjectURLSpy;
    global.URL.revokeObjectURL = revokeObjectURLSpy;

    const htmlContent = "<html><body><h1>Test</h1></body></html>";
    downloadHtmlFile("test.html", htmlContent);

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));
    expect(revokeObjectURLSpy).toHaveBeenCalledWith("mocked-url");

    const linkElement = createElementSpy.mock.results[0].value;
    expect(linkElement.click).toHaveBeenCalled();
  });
});
