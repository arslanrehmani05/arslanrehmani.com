// sanity/theme.ts
import { buildLegacyTheme } from 'sanity';

export const studioTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': '#0A0A0A',
  '--white': '#F5F5F0',

  '--gray': '#888888',
  '--gray-base': '#111111',

  '--component-bg': '#0A0A0A',
  '--component-sidebar-bg': '#111111',

  /* Brand Colors */
  '--brand-primary': '#C9A84C',

  /* Default buttons */
  '--default-button-color': '#232323',
  '--default-button-primary-color': '#C9A84C',
  '--default-button-success-color': '#22c55e',
  '--default-button-warning-color': '#D4B05A',
  '--default-button-danger-color': '#ef4444',

  /* State colors */
  '--state-info-color': '#C9A84C',
  '--state-success-color': '#22c55e',
  '--state-warning-color': '#D4B05A',
  '--state-danger-color': '#ef4444',

  /* Navbar styling */
  '--main-navigation-color': '#0A0A0A',
  '--main-navigation-color--inverted': '#F5F5F0',

  '--focus-color': '#C9A84C',
});
