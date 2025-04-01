type Theme = {
  _type: 'light' | 'dark';
  background: string;
  background1: string;
  foreground: string;
};

const themes = {
  light: {
    _type: 'light',
    background: '#fff',
    background1: '#f3f4f6',
    foreground: '#000',
  },
  dark: {
    _type: 'dark',
    background: '#090b10',
    background1: '#0f111a',
    foreground: '#7b83a3',
  },
  custom1: {
    _type: 'light',
    background: '#ff0',
    background1: '#ff0',
    foreground: '#000',
  },
  custom2: {
    _type: 'dark',
    background: '#000',
    background1: '#000',
    foreground: '#ff0',
  },
} satisfies Record<string, Theme>;

export { themes };
