// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { studioTheme } from './sanity/theme';

export default defineConfig({
  name: 'default',
  title: 'Arslan Rehmani — CMS Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  theme: studioTheme,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
