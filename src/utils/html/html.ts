type GetElementIdFunction<T extends string> = {
  <U extends string>(elementSuffix: U): `${T}__${U}`;
  <U extends string>(elementSuffix: U, index: number): `${T}__${U}__${number}`;
};

const getElementId = <T extends string>(blockId: T) => {
  function fn<U extends string>(elementSuffix: U): `${T}__${U}`;
  function fn<U extends string>(elementSuffix: U, index: number): `${T}__${U}__${number}`;
  function fn<U extends string>(elementSuffix: U, index?: number) {
    const baseId = `${blockId}__${elementSuffix}`;
    return index !== undefined ? `${baseId}__${index}` : baseId;
  }

  return fn;
};

export { getElementId, type GetElementIdFunction };
