const toPath = (segments: string[]) => {
  return `/${segments.join('/')}`;
};

export { toPath };
