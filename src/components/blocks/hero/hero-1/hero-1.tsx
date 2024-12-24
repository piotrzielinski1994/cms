import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { Hero1Props } from './hero-1.types';

const Hero1 = (props: Hero1Props) => {
  return (
    <Section>
      <Container>
        {props.blockName} {props.heading}
      </Container>
    </Section>
  );
};

export default Hero1;
