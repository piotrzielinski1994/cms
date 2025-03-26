export const availableThemes = ['light', 'dark', 'custom'] as const;

export type Theme = (typeof availableThemes)[number];

export interface ThemeContextType {
  setTheme: (theme: Theme | null) => void;
  theme?: Theme | null;
}

export function themeIsValid(string: null | Theme): string is Theme {
  return string ? availableThemes.includes(string) : false;
}
