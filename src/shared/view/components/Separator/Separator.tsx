import React from 'react';
import { observer } from 'mobx-react-lite';

import styles from './Separator.module.scss';

export const Separator = observer(function Separator() {
  return <div className={styles.root} />;
});
