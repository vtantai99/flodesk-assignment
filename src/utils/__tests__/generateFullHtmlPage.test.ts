import { generateFullHtmlPage } from '../generateFullHtmlPage';

describe('generateFullHtmlPage', () => {
  it('should generate a full HTML page with default title and lang', () => {
    const bodyContent = '<div>Test content</div>';
    const result = generateFullHtmlPage(bodyContent);

    expect(result).toContain('<title>My Static Page</title>');
    expect(result).toContain('lang="en"');
    expect(result).toContain(bodyContent);
  });

  it('should generate a full HTML page with custom title and lang', () => {
    const bodyContent = '<div>Test content</div>';
    const options = { title: 'Custom Title', lang: 'fr' };
    const result = generateFullHtmlPage(bodyContent, options);

    expect(result).toContain('<title>Custom Title</title>');
    expect(result).toContain('lang="fr"');
    expect(result).toContain(bodyContent);
  });

  it('should generate a full HTML page with default values when no options are passed', () => {
    const bodyContent = '<div>Test content</div>';
    const result = generateFullHtmlPage(bodyContent);

    expect(result).toContain('<title>My Static Page</title>');
    expect(result).toContain('lang="en"');
    expect(result).toContain(bodyContent);
  });
});
