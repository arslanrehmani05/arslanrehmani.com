import StudioClient from './studio-client';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id';
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  return <StudioClient projectId={projectId} dataset={dataset} />;
}
