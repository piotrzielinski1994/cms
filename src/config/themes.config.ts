type Theme = keyof typeof themes | 'system';
type ThemeConfig = {
  colorPreference: 'light' | 'dark';
  background: string;
  background1: string;
  foreground: string;
  primary: {
    DEFAULT: string;
    foreground: string;
  };
  input: string;
  components: {
    accordion: {
      DEFAULT: string;
      foreground: string;
    };
  };
};

const themes = {
  light: {
    colorPreference: 'light',
    background: '#fff',
    background1: '#f3f4f6',
    foreground: '#000',
    primary: {
      DEFAULT: '#000',
      foreground: '#fff',
    },
    input: '#fff',
    components: {
      accordion: {
        DEFAULT: '#f3f4f6',
        foreground: '#000',
      },
    },
  },
  dark: {
    colorPreference: 'dark',
    background: '#090b10',
    background1: '#0f111a',
    foreground: '#7b83a3',
    primary: {
      DEFAULT: '#7b83a3',
      foreground: '#090b10',
    },
    input: '#0f111a',
    components: {
      accordion: {
        DEFAULT: '#0f111a',
        foreground: '#7b83a3',
      },
    },
  },
  custom1: {
    colorPreference: 'light',
    background: '#ff0',
    background1: '#ff0',
    foreground: '#000',
    primary: {
      DEFAULT: '#000',
      foreground: '#ff0',
    },
    input: '#ff0',
    components: {
      accordion: {
        DEFAULT: '#000',
        foreground: '#ff0',
      },
    },
  },
  custom2: {
    colorPreference: 'dark',
    background: '#000',
    background1: '#000',
    foreground: '#ff0',
    primary: {
      DEFAULT: '#ff0',
      foreground: '#000',
    },
    input: '#000',
    components: {
      accordion: {
        DEFAULT: '#ff0',
        foreground: '#000',
      },
    },
  },
} satisfies Record<string, ThemeConfig>;

const getThemeConfig = (theme: Theme): ThemeConfig => {
  if (theme !== 'system') return themes[theme];
  if (typeof window === 'undefined') return themes.light;
  const media = window.matchMedia('(prefers-color-scheme:dark)');
  const colorPreference: ThemeConfig['colorPreference'] = media.matches ? 'dark' : 'light';
  return themes[colorPreference];
};

export { getThemeConfig, themes, type Theme, type ThemeConfig };
