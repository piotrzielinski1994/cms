import { cn } from '@/utils/tailwind';
import { HTMLAttributes, ReactNode } from 'react';

type TableProps = HTMLAttributes<HTMLTableElement> & {
  header: ReactNode[];
  body: ReactNode[][];
  footer?: ReactNode[];
};

// We always map through header columns in case body or footer are of different length
// Static tuple declarations won't work as we always .map before passing props -> loosing tuple
const Table = ({ header, body, footer = [], ...props }: TableProps) => {
  const hasEvenElements = body.length % 2 === 0;
  return (
    <div className="w-full overflow-x-auto">
      <table {...props} className={cn('w-full', props.className)}>
        <thead className="font-semibold">
          <tr className="bg-primary text-primary-foreground">
            {header.map((cell, index) => {
              return (
                <td key={index} className={cn('px-4 py-2 md:px-6 md:py-4')}>
                  {cell}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {body.map((row, index) => {
            const isEven = index % 2 === 0;
            const cells = header.map((_, index) => {
              const cell = row[index];
              return (
                <td key={index} className="px-4 py-2 md:px-6 md:py-4">
                  {cell}
                </td>
              );
            });
            return (
              <tr
                key={index}
                className={cn({
                  'bg-background': isEven,
                  'bg-background1': !isEven,
                })}
              >
                {cells}
              </tr>
            );
          })}
        </tbody>
        {footer.length > 0 && (
          <tfoot className="font-semibold">
            <tr
              className={cn({
                'bg-background': hasEvenElements,
                'bg-background1': !hasEvenElements,
              })}
            >
              {header.map((_, index) => {
                const cell = footer[index];
                return (
                  <td key={index} className="px-4 py-2 md:px-6 md:py-4">
                    {cell}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export { Table };
