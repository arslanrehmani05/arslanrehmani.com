'use client';

import { NextStudio } from 'next-sanity/studio';
import { createSanityConfig } from '../../../sanity.config';

interface StudioClientProps {
  projectId: string;
  dataset: string;
}

export default function StudioClient({ projectId, dataset }: StudioClientProps) {
  const config = createSanityConfig(projectId, dataset);
  return <NextStudio config={config} />;
}
