import React from 'react';

import type { Page } from '@/_old/payload.types';

import { HighImpactHero } from '@/_old/heros/HighImpact';
import { LowImpactHero } from '@/_old/heros/LowImpact';
import { MediumImpactHero } from '@/_old/heros/MediumImpact';

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
};

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {};

  if (!type || type === 'none') return null;

  const HeroToRender = heroes[type];

  if (!HeroToRender) return null;

  return <HeroToRender {...props} />;
};
