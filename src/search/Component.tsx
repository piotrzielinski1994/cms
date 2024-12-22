'use client';
import { Input } from '@/_old/components/ui/input';
import { Label } from '@/_old/components/ui/label';
import { useDebounce } from '@/utilities/useDebounce';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const router = useRouter();

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`);
  }, [debouncedValue, router]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder="Search"
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  );
};
