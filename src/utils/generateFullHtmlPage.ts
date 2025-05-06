export const generateFullHtmlPage = (bodyContent: string, options?: { title?: string; lang?: string }) => {
  const title = options?.title || "My Static Page";
  const lang = options?.lang || "en";

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Generated static page" />
  <title>${title}</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
};
