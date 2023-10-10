export const themeTypes = ['day', 'night'] as const;
export type Theme = (typeof themeTypes)[number];

export type Dimension = {
  width: number;
  height: number;
};

export type DisplayMode = 'standalone' | 'browser';
