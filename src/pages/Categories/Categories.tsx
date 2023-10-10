import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { useFeature } from 'features/featureProvider';
import { InnerBlock } from 'pages/shared/InnerBlock/InnerBlock';
import * as M from 'services/questions/mobx/model';

import { Category } from './Category/Category';
import { CategoryIcon } from './CategoryIcon/CategoryIcon';
import styles from './Categories.module.scss';

export const Categories = observer(function Categories() {
  const { t, tKeys } = useService('i18n');
  const { categories } = useService('questions');
  const { resetQuiz } = useFeature('quiz');
  const translations = tKeys.pages.categories;

  return (
    <InnerBlock title={t(translations.title)} aria-label="categories">
      <div className={styles.root}>
        <ul className={styles.list}>
          {Object.keys(categories).map(categoryName => (
            <li key={categoryName} className={styles.item}>
              <Category
                categoryKey={categoryName as M.Category}
                questionsAmount={categories[categoryName as M.Category].length}
                onClick={handleCategoryClick}
              />
            </li>
          ))}
        </ul>
        <div className={styles.icon}>
          <CategoryIcon />
        </div>
      </div>
    </InnerBlock>
  );

  function handleCategoryClick() {
    resetQuiz();
  }
});
