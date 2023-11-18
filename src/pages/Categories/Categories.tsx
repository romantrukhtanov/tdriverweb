import React from 'react';
import { observer } from 'mobx-react-lite';
import { animated } from '@react-spring/web';

import { useService } from 'services/servicesProvider';
import { useFeature } from 'features/featureProvider';
import { getDefaultConfig, useSpringOnce } from 'shared/animations/useSpringOnce';
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

  const spring = useSpringOnce('categories-list', getDefaultConfig({ y: '70%', duration: 750 }));

  const iconSpring = useSpringOnce(
    'categories-icon',
    getDefaultConfig({ x: '20%', duration: 750 }),
  );

  return (
    <InnerBlock title={t(translations.title)} aria-label="categories">
      <div className={styles.root}>
        <ul className={styles.list}>
          {Object.keys(categories).map(categoryName => (
            <animated.li key={categoryName} className={styles.item} style={spring}>
              <Category
                categoryKey={categoryName as M.Category}
                questionsAmount={categories[categoryName as M.Category].length}
                onClick={handleCategoryClick}
              />
            </animated.li>
          ))}
        </ul>
        <animated.div className={styles.icon} style={iconSpring}>
          <CategoryIcon />
        </animated.div>
      </div>
    </InnerBlock>
  );

  function handleCategoryClick() {
    resetQuiz();
  }
});
