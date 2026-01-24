class ReactContextError extends Error {
  constructor(providerName: string) {
    super(`${providerName} components must be used within ${providerName}.Provider`);
    this.name = 'ReactContextError';
  }
}

export { ReactContextError };
