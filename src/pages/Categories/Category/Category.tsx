import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import * as M from 'services/questions/mobx/model';

import styles from './Category.module.scss';

type Props = {
  categoryKey: M.Category;
  questionsAmount: number;
  onClick?(): void;
};

export const Category = observer(function Category({
  categoryKey,
  questionsAmount,
  onClick,
}: Props) {
  const { t, tKeys } = useService('i18n');
  const translations = tKeys.pages.categories;
  const categoryName = t(translations.list[categoryKey]);

  return (
    <NavLink className={styles.root} to={`/categories/${categoryKey}`} onClick={onClick}>
      <div className={styles.nameWrapper}>
        <h2 className={styles.name}>{categoryName}</h2>
      </div>
      <div className={styles.questionsWrapper}>
        <p className={styles.questions}>
          {t(translations.questions, {
            amount: questionsAmount,
          })}
        </p>
      </div>
    </NavLink>
  );
});
