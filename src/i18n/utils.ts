import { ui, defaultLang, languages, type SupportedLanguage } from './ui';

const nonDefaultLangs = Object.keys(languages).filter(
  (l) => l !== defaultLang,
) as SupportedLanguage[];

/**
 * Extracts the current locale from the URL pathname.
 * Returns 'en' for root paths like '/' or '/privacy',
 * and the language code for paths like '/es/' or '/ja/privacy'.
 */
export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) {
    return lang as SupportedLanguage;
  }
  return defaultLang;
}

/**
 * Returns the translations object for the specified language.
 */
export function useTranslations(lang: SupportedLanguage) {
  return ui[lang] || ui[defaultLang];
}

/**
 * Strips any existing non-default language prefix from a pathname.
 * e.g., '/es/privacy' -> '/privacy', '/es/' -> '/', '/privacy' -> '/privacy'
 */
export function getCleanPath(pathname: string): string {
  // Normalize leading slash
  let path = pathname.startsWith('/') ? pathname : '/' + pathname;

  for (const lang of nonDefaultLangs) {
    if (path === `/${lang}` || path === `/${lang}/`) {
      return '/';
    }
    if (path.startsWith(`/${lang}/`)) {
      return path.slice(lang.length + 1); // e.g. /es/privacy -> /privacy
    }
  }

  return path === '' ? '/' : path;
}

/**
 * Generates the deterministic localized URL for language switching.
 * - For defaultLang ('en'): '/' or '/privacy'
 * - For other langs ('es', 'ja', etc.): '/es/' or '/es/privacy'
 */
export function getLocalizedPath(
  currentPath: string,
  targetLang: SupportedLanguage,
): string {
  const cleanPath = getCleanPath(currentPath);

  if (targetLang === defaultLang) {
    return cleanPath;
  }

  if (cleanPath === '/') {
    return `/${targetLang}/`;
  }

  return `/${targetLang}${cleanPath}`;
}

/**
 * Generates absolute alternate URLs for all supported languages + x-default for SEO hreflang tags.
 */
export function getAlternateUrls(currentPath: string, siteUrl = 'https://image2hex.github.io') {
  const cleanPath = getCleanPath(currentPath);
  const base = siteUrl.replace(/\/+$/, '');

  const alternates: { lang: string; url: string }[] = Object.keys(languages).map((l) => {
    const lang = l as SupportedLanguage;
    const localized = getLocalizedPath(cleanPath, lang);
    return {
      lang,
      url: `${base}${localized}`,
    };
  });

  // Add x-default (points to the default English URL)
  alternates.push({
    lang: 'x-default',
    url: `${base}${cleanPath}`,
  });

  return alternates;
}
