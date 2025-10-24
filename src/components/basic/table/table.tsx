import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { forwardRef, ReactNode } from 'react';

type TableProps = HtmlProps['table'] & {
  header: ReactNode[];
  body: ReactNode[][];
  footer?: ReactNode[];
};

// We always map through header columns in case body or footer are of different length
// Static tuple declarations won't work as we always .map before passing props -> loosing tuple
const Component = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const { header, body, footer = [], ...rest } = props;
  const hasEvenElements = body.length % 2 === 0;
  return (
    <Root>
      <Native ref={ref} {...rest}>
        <Header>
          <Row className="bg-primary text-primary-foreground">
            {header.map((cell, index) => {
              return <Column key={index}>{cell}</Column>;
            })}
          </Row>
        </Header>
        <Body>
          {body.map((row, index) => {
            const isEven = index % 2 === 0;
            const className = cn('bg-background', { 'bg-background1': !isEven });
            const cells = header.map((_, index) => {
              const cell = row[index];
              return <Column key={index}>{cell}</Column>;
            });
            // prettier-ignore
            return <Row key={index} className={className}>{cells}</Row>;
          })}
        </Body>
        {footer.length > 0 && (
          <Footer>
            <Row className={cn('bg-background', { 'bg-background1': !hasEvenElements })}>
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

const Root = ({ className, ...rest }: HtmlProps['div']) => {
  const defaultClassNames = cn('w-full overflow-x-auto', className);
  return <div className={defaultClassNames} {...rest} />;
};

const Native = forwardRef<HTMLTableElement, HtmlProps['table']>(({ className, ...rest }) => {
  return <table className={cn('w-full', className)} {...rest} />;
});

const Header = ({ className, ...rest }: HtmlProps['thead']) => {
  const defaultClassNames = cn('font-semibold', className);
  return <thead className={defaultClassNames} {...rest} />;
};

const Body = (props: HtmlProps['tbody']) => <tbody {...props} />;

const Footer = ({ className, ...rest }: HtmlProps['tfoot']) => {
  const defaultClassNames = cn('font-semibold', className);
  return <tfoot className={defaultClassNames} {...rest} />;
};

const Row = (props: HtmlProps['tr']) => <tr {...props} />;

const Column = ({ className, ...rest }: HtmlProps['td']) => {
  const defaultClassNames = cn('px-4 py-2 md:px-6 md:py-4', className);
  return <td className={defaultClassNames} {...rest} />;
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
