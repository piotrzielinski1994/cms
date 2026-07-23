import { useId } from 'react';
import { type GetElementIdFunction, getElementId } from '@/utils/html/html';

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
