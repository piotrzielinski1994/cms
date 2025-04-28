type Theme = keyof typeof themes;

type ThemeConfig = {
  _type: 'light' | 'dark';
  background: string;
  background1: string;
  foreground: string;
  primary: {
    DEFAULT: string;
    foreground: string;
  };
  input: string;
};

const themes = {
  light: {
    _type: 'light',
    background: '#fff',
    background1: '#f3f4f6',
    foreground: '#000',
    primary: {
      DEFAULT: '#000',
      foreground: '#fff',
    },
    input: '#fff',
  },
  dark: {
    _type: 'dark',
    background: '#090b10',
    background1: '#0f111a',
    foreground: '#7b83a3',
    primary: {
      DEFAULT: '#7b83a3',
      foreground: '#090b10',
    },
    input: '#0f111a',
  },
  custom1: {
    _type: 'light',
    background: '#ff0',
    background1: '#ff0',
    foreground: '#000',
    primary: {
      DEFAULT: '#000',
      foreground: '#ff0',
    },
    input: '#ff0',
  },
  custom2: {
    _type: 'dark',
    background: '#000',
    background1: '#000',
    foreground: '#ff0',
    primary: {
      DEFAULT: '#ff0',
      foreground: '#000',
    },
    input: '#000',
  },
} satisfies Record<string, ThemeConfig>;

export { themes, type Theme };
