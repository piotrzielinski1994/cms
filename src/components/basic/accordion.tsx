import React from 'react';

type AccordionProps = {
  items: {
    heading: React.ReactNode;
    content: React.ReactNode;
  }[];
};

const Accordion = ({ items }: AccordionProps) => {
  return (
    <div>
      {items.map(({ heading, content }) => (
        <details key={String(heading)}>
          <summary>{heading}</summary>
          <div>{content}</div>
        </details>
      ))}
    </div>
  );
};

export { Accordion };
