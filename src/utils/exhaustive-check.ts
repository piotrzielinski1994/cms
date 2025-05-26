const exhaustiveCheck = (param: never): never => {
  throw new Error(`Exhaustive check ${param}`);
};

export { exhaustiveCheck };
