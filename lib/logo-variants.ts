// lib/logo-variants.ts
export type LogoVariant = 'apex' | 'prism' | 'delta' | 'brackets' | 'architectural';

export interface LogoOption {
  id: LogoVariant;
  name: string;
  tagline: string;
  description: string;
}

export const LOGO_OPTIONS: LogoOption[] = [
  {
    id: 'apex',
    name: 'The Kinetic Apex',
    tagline: 'Velocity, Direction & Algorithmic Execution',
    description:
      'A razor-sharp dual-facet vector pointing upward and forward. Subtly evokes the letter A while functioning as a high-speed execution cursor. Pure LeftClick minimalism.',
  },
  {
    id: 'prism',
    name: 'The Systems Prism',
    tagline: 'Software Architecture & Infrastructure',
    description:
      'A mathematical 3D isometric block with calibrated planar facets and a central core. Symbolizes building foundational operational ERPs and production engines.',
  },
  {
    id: 'delta',
    name: 'The Delta Core',
    tagline: 'High-Tech Aerospace & AI Research Mark',
    description:
      'An architectural delta chevron with an inner floating precision core. Minimal, balanced, and immediately authoritative at 16px favicon scale.',
  },
  {
    id: 'brackets',
    name: 'The Terminal Chevrons',
    tagline: 'Automated Pipelines & Velocity',
    description:
      'Nested dual-phase chevrons representing continuous deployment, automated workflows, and operational acceleration.',
  },
  {
    id: 'architectural',
    name: 'The Architectural AR',
    tagline: 'Refined Swiss Hairline Ligature',
    description:
      'An ultra-clean architectural wireframe monogram. Abandons all chunky blocks in favor of 1.6px golden-ratio lines with balanced negative space.',
  },
];

export const DEFAULT_LOGO_VARIANT: LogoVariant = 'apex';
