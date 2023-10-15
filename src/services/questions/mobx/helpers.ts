import { CATEGORIES_SET } from '../constants';
import type * as M from './model';

export const checkCategory = (categoryName: string): categoryName is M.Category => {
  if (!categoryName) {
    return false;
  }

  return CATEGORIES_SET.has(categoryName);
};

export const getLocalQuestion = (questionData: M.QuestionData, localIndex: number): M.Question => {
  return {
    localIndex,
    questionData,
    status: 'default',
  };
};
