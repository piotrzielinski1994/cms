import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { BoolMap } from '@/utils/types';
import { forwardRef, ReactNode } from 'react';

type TableProps = HtmlProps<'table'> & {
  header: ReactNode[];
  body: ReactNode[][];
  footer?: ReactNode[];
};

const styles = {
  root: 'w-full overflow-x-auto',
  native: 'w-full',
  header: 'font-semibold',
  headerRow: 'bg-primary text-primary-foreground',
  row: ({ isOdd }: BoolMap<'isOdd'>) => cn('bg-background', { 'bg-background1': isOdd }),
  column: 'px-4 py-2 md:px-6 md:py-4',
  footer: 'font-semibold',
  footerRow: ({ isOdd }: BoolMap<'isOdd'>) => cn('bg-background', { 'bg-background1': !isOdd }),
};

// We always map through header columns in case body or footer are of different length
// Static tuple declarations won't work as we always .map before passing props -> loosing tuple
const Component = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const { header, body, footer = [], className, ...rest } = props;
  const hasEvenElements = body.length % 2 === 0;
  return (
    <Root className={className}>
      <Native ref={ref} {...rest}>
        <Header>
          <Row className={styles.headerRow}>
            {header.map((cell, index) => {
              return <Column key={index}>{cell}</Column>;
            })}
          </Row>
        </Header>
        <Body>
          {body.map((row, index) => {
            const isOdd = index % 2 !== 0;
            const cells = header.map((_, index) => {
              const cell = row[index];
              return <Column key={index}>{cell}</Column>;
            });
            // prettier-ignore
            return <Row key={index} className={styles.row({ isOdd })}>{cells}</Row>;
          })}
        </Body>
        {footer.length > 0 && (
          <Footer>
            <Row className={styles.footerRow({ isOdd: hasEvenElements })}>
              {header.map((_, index) => {
                const cell = footer[index];
                return <Column key={index}>{cell}</Column>;
              })}
            </Row>
          </Footer>
        )}
      </Native>
    </Root>
  );
});

const Root = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div className={cn(styles.root, className)} {...rest} />;
};

const Native = forwardRef<HTMLTableElement, HtmlProps<'table'>>(({ className, ...rest }) => {
  return <table className={cn(styles.native, className)} {...rest} />;
});

const Header = ({ className, ...rest }: HtmlProps<'thead'>) => {
  return <thead className={cn(styles.header, className)} {...rest} />;
};

const Body = (props: HtmlProps<'tbody'>) => <tbody {...props} />;

const Footer = ({ className, ...rest }: HtmlProps<'tfoot'>) => {
  return <tfoot className={cn(styles.footer, className)} {...rest} />;
};

const Row = (props: HtmlProps<'tr'>) => <tr {...props} />;

const Column = ({ className, ...rest }: HtmlProps<'td'>) => {
  return <td className={cn(styles.column, className)} {...rest} />;
};

const Table = Object.assign(Component, {
  Root,
  Native,
  Header,
  Body,
  Footer,
  Row,
  Column,
});

export { Table };
