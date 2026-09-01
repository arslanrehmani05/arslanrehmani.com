import StudioClient from './studio-client';

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <StudioClient />;
}
