import { HtmlProps } from '@/utils/html/html.types';
import { forwardRef } from 'react';

const Root = (props: HtmlProps['div']) => <div {...props} />;

const Native = forwardRef<HTMLTableElement, HtmlProps['table']>((props, ref) => {
  return <table ref={ref} {...props} />;
});

const Header = (props: HtmlProps['thead']) => <thead {...props} />;
const Body = (props: HtmlProps['tbody']) => <tbody {...props} />;
const Footer = (props: HtmlProps['tfoot']) => <tfoot {...props} />;
const Row = (props: HtmlProps['tr']) => <tr {...props} />;
const Column = (props: HtmlProps['td']) => <td {...props} />;

Native.displayName = 'TableBase.Native';

const TableBase = {
  Root,
  Native,
  Header,
  Body,
  Footer,
  Row,
  Column,
};

export default TableBase;
