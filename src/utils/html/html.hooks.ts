import { getElementId, GetElementIdFunction } from '@/utils/html/html';
import { useId } from 'react';

const useHtmlId = <T extends string>(
  prefix: T,
): {
  id: `${string}__${T}`;
  getId: GetElementIdFunction<`${string}__${T}`>;
} => {
  const id = useId();
  const blockId: `${string}__${T}` = `${id}__${prefix}`;
  return { id: blockId, getId: getElementId(blockId) };
};

export { useHtmlId };
