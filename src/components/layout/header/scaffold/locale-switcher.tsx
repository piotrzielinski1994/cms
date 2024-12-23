'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_old/components/ui/select';
import { contentLocale } from '@/payload/locale';
import { usePathname, useRouter } from '@/payload/locale/routing';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { TypedLocale } from 'payload';
import { useTransition } from 'react';

const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value },
      );
    });
  }

  // return (
  //   <SelectPrimitive.Root>
  //     <SelectPrimitive.Trigger className="inline-flex items-center bg-white border border-gray-300 rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
  //       <SelectPrimitive.Value placeholder="Theme" aria-label={locale} className="text-gray-700">
  //         {locale}
  //       </SelectPrimitive.Value>
  //       <SelectPrimitive.Icon className="ml-2 text-gray-500" />
  //     </SelectPrimitive.Trigger>

  //     <SelectPrimitive.Portal>
  //       <SelectPrimitive.Content className="z-10 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
  //         <SelectPrimitive.ScrollUpButton className="flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100" />
  //         <SelectPrimitive.Viewport className="max-h-60 overflow-auto">
  //           {contentLocale.list
  //             .sort((a, b) => a.localeCompare(b))
  //             .map((it) => (
  //               <SelectPrimitive.Item
  //                 key={it}
  //                 value={locale}
  //                 className="px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-200"
  //               >
  //                 <SelectPrimitive.ItemText>{it}</SelectPrimitive.ItemText>
  //                 <SelectPrimitive.ItemIndicator className="text-blue-500">
  //                   <CheckIcon />
  //                 </SelectPrimitive.ItemIndicator>
  //               </SelectPrimitive.Item>
  //             ))}
  //         </SelectPrimitive.Viewport>
  //         <SelectPrimitive.ScrollDownButton className="flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100" />
  //         <SelectPrimitive.Arrow className="absolute top-full left-1/2 transform -translate-x-1/2 text-gray-500" />
  //       </SelectPrimitive.Content>
  //     </SelectPrimitive.Portal>
  //   </SelectPrimitive.Root>
  // );

  return (
    <Select onValueChange={onSelectChange} value={locale}>
      <SelectTrigger className="w-auto text-sm bg-transparent gap-2 pl-0 md:pl-3 border-none">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {contentLocale.list
          .sort((a, b) => a.localeCompare(b))
          .map((locale) => (
            <SelectItem value={locale} key={locale}>
              {locale.toUpperCase()}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcher;
