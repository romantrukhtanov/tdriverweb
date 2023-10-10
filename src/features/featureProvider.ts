import { useContext, createContext } from 'react';

import { Services } from 'services';
import { QuizStore } from 'features/quiz/mobx/QuizStore';

export class Features {
  constructor(services: Services) {
    this.quiz = new QuizStore(services);
  }

  readonly quiz: QuizStore;
}

const featuresContext = createContext<Features | null>(null);
const FeaturesProvider = featuresContext.Provider;

function useFeature<T extends keyof Features>(featureName: T) {
  const context = useContext(featuresContext);
  if (context) {
    return context[featureName];
  }
  throw Error('Feature Provider or features in Feature Provider are not provided!');
}

export { useFeature, FeaturesProvider, featuresContext };
