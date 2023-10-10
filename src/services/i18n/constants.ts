export const AVAILABLE_LANGUAGES = ['ru', 'uz', 'uzk'] as const;

export type Language = (typeof AVAILABLE_LANGUAGES)[number];

export const NAME_SPACE = 'translation';
