import { Hero1Props } from './hero-1.types';

const Hero1 = (props: Hero1Props) => {
  return (
    <div>
      {props.blockName} {props.heading}
    </div>
  );
};

export default Hero1;
