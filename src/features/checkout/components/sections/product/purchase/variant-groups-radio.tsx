'use client';

import { cn } from '@/utils/tailwind';
import { useId } from 'react';

type Option = { label: string; value: string };
type Group = { name: string; label: string; options: Option[] };

type VariantGroupsRadioProps = {
  groups: Group[];
  selected: Record<string, string | undefined>;
  onSelect: (groupName: string, optionValue: string) => void;
};

const VariantGroupsRadio = ({ groups, selected, onSelect }: VariantGroupsRadioProps) => {
  const baseId = useId();
  return (
    <div className="grid gap-3">
      {groups.map((group) => (
        <fieldset key={group.name} className="grid gap-2">
          <legend className="text-sm font-semibold">{group.label}</legend>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
              const id = `${baseId}-${group.name}-${option.value}`;
              const isChecked = selected[group.name] === option.value;
              return (
                <label
                  key={option.value}
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
                    name={`${baseId}-${group.name}`}
                    value={option.value}
                    checked={isChecked}
                    onChange={() => onSelect(group.name, option.value)}
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

export { VariantGroupsRadio };
