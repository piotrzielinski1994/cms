import {
  Gauge,
  Globe,
  Heart,
  Lock,
  Rocket,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Card } from '@/components/basic/card/card';
import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import type { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

const iconMap = {
  rocket: <Rocket aria-hidden className="w-[1lh] h-[1lh]" />,
  zap: <Zap aria-hidden className="w-[1lh] h-[1lh]" />,
  shield: <ShieldCheck aria-hidden className="w-[1lh] h-[1lh]" />,
  sparkles: <Sparkles aria-hidden className="w-[1lh] h-[1lh]" />,
  heart: <Heart aria-hidden className="w-[1lh] h-[1lh]" />,
  star: <Star aria-hidden className="w-[1lh] h-[1lh]" />,
  settings: <Settings aria-hidden className="w-[1lh] h-[1lh]" />,
  globe: <Globe aria-hidden className="w-[1lh] h-[1lh]" />,
  lock: <Lock aria-hidden className="w-[1lh] h-[1lh]" />,
  gauge: <Gauge aria-hidden className="w-[1lh] h-[1lh]" />,
} satisfies Record<string, ReactNode>;

type IconName = keyof typeof iconMap;

type FeaturesProps = HtmlProps<'section'> & {
  heading?: string;
  subheading?: string;
  items?: Array<{ icon?: IconName; title: string; description?: string }>;
};

const Features = ({ heading, subheading, items = [], className, ...rest }: FeaturesProps) => {
  const hasHeader = Boolean(heading || subheading);

  return (
    <Section {...rest} className={className}>
      <Container className="grid gap-8">
        {hasHeader && (
          <header className="text-center">
            {heading && <h2 className={cn('text-5xl font-semibold')}>{heading}</h2>}
            {subheading && <p>{subheading}</p>}
          </header>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.title}
              header={
                <>
                  {item.icon && iconMap[item.icon]}
                  <h3>{item.title}</h3>
                </>
              }
            >
              {item.description && <p>{item.description}</p>}
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export type { IconName };
export { Features };
