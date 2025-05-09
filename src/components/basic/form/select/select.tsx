import { cn } from '@/utils/tailwind';
import { Popover } from 'radix-ui';
import { useState } from 'react';
import { inputClassNames } from '../text-input/text-input';

const SelectA = () => {
  const [selected, setSelected] = useState('');
  const [inputValue, setInputValue] = useState('');
  const options = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <label
          className={cn(inputClassNames.input({ isValid: true }))}
          aria-label="Select option"
          htmlFor="checkbox-toggle"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={selected !== ''}
          aria-controls="options-list" // Link the combobox to the listbox
        >
          <input
            id="checkbox-toggle"
            type="checkbox"
            checked={selected !== ''}
            onChange={() => setSelected(selected ? '' : 'Option 1')}
            className="sr-only"
          />
          <span>{selected || 'Select...'}</span>
        </label>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="bg-background border border-primary"
          sideOffset={5}
          role="listbox"
          id="options-list" // Ensure this ID matches the aria-controls
          aria-labelledby="checkbox-toggle"
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Filter..."
            aria-autocomplete="list"
            aria-controls="options-list"
            className={cn(
              inputClassNames.input({ isValid: true }),
              'p-1 border-t-0 border-x-0 text-sm',
            )}
          />
          <div className="grid">
            {options
              .filter((opt) => opt.toLowerCase().includes(inputValue.toLowerCase()))
              .map((opt) => (
                <label key={opt} className="focus-within:tw-cms-outline" htmlFor={opt}>
                  <input
                    id={opt}
                    type="radio"
                    name="select-options"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => {
                      setSelected(opt);
                      setInputValue('');
                    }}
                    className="sr-only"
                  />
                  <span>{opt}</span>
                </label>
              ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export { SelectA };
