type Theme = {
  background: string;
  background1: string;
  foreground: string;
};

const themes = {
  light: {
    background: '#fff',
    background1: '#f3f4f6',
    foreground: '#000',
  },
  dark: {
    background: '#090b10',
    background1: '#0f111a',
    foreground: '#7b83a3',
  },
  custom: {
    background: '#ff0',
    background1: '#ff0',
    foreground: '#000',
  },
} satisfies Record<string, Theme>;

export { themes };
