// sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemaTypes';
import { studioTheme } from './sanity/theme';

export function createSanityConfig(projectId?: string, dataset?: string) {
  return defineConfig({
    name: 'default',
    title: 'Arslan Rehmani — CMS Studio',
    projectId: projectId || process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id',
    dataset: dataset || process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    basePath: '/studio',
    theme: studioTheme,
    plugins: [structureTool()],
    schema: {
      types: schemaTypes,
    },
  });
}

export default createSanityConfig();
