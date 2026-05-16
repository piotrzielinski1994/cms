'use client';

import { cn } from '@/utils/tailwind';
import { useId, useMemo, useState } from 'react';

type Option = { id: string; label: string; value: string };
type Group = { id: string; label: string; options: Option[] };
type VariantSummary = { id: string; optionIds: string[] };

type VariantSelectorClientProps = {
  groups: Group[];
  variants: VariantSummary[];
};

const VariantSelectorClient = ({ groups, variants }: VariantSelectorClientProps) => {
  const baseId = useId();
  const [selected, setSelected] = useState<Record<string, string>>({});

  const matchingVariant = useMemo(() => {
    const selectedIds = Object.values(selected);
    if (selectedIds.length !== groups.length) return null;
    return (
      variants.find((v) => selectedIds.every((optId) => v.optionIds.includes(optId))) ?? null
    );
  }, [selected, groups.length, variants]);

  const onSelect = (groupId: string, optionId: string) => {
    setSelected((prev) => ({ ...prev, [groupId]: optionId }));
  };

  return (
    <div className="grid gap-3 w-full" data-variant-id={matchingVariant?.id ?? ''}>
      {groups.map((group) => (
        <fieldset key={group.id} className="grid gap-2">
          <legend className="text-sm font-semibold">{group.label}</legend>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const id = `${baseId}-${group.id}-${option.id}`;
              const isChecked = selected[group.id] === option.id;
              return (
                <label
                  key={option.id}
                  htmlFor={id}
                  className={cn(
                    'px-3 py-1 border-2 cursor-pointer text-sm select-none',
                    'border-primary',
                    'has-[:focus-visible]:tw-cms-outline',
                    isChecked
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background hover:bg-foreground/5',
                  )}
                >
                  <input
                    id={id}
                    type="radio"
                    name={`${baseId}-${group.id}`}
                    value={option.id}
                    checked={isChecked}
                    onChange={() => onSelect(group.id, option.id)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export { VariantSelectorClient };
