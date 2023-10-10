import React from 'react';
import { observer } from 'mobx-react-lite';

import { useService } from 'services/servicesProvider';
import { BottomSheetIos } from 'services/installation/view/BottomSheet/BottomSheetIos/BottomSheetIos';

import { SafariIcon } from './SafariIcon';
import { ShareIcon } from './ShareIcon';
import { AddIcon } from './AddIcon';
import styles from './InstallationIos.module.scss';

// original source: https://github.com/khmyznikov/pwa-install

export const InstallationIos = observer(function InstallationIos() {
  const { manifest } = useService('installation');

  const { isShowCustomInstallPrompt, hideInstallPrompt } = useService('installation');

  const { t, tKeys } = useService('i18n');
  const translations = tKeys.services.installation;

  if (!manifest) {
    return null;
  }

  return (
    <BottomSheetIos isOpen={isShowCustomInstallPrompt} onClose={hideInstallPrompt}>
      <div className={styles.root}>
        <div className={styles.icon}>
          <img src={manifest.icons?.[0].src} alt="icon" className={styles.iconImage} />
        </div>
        <div className={styles.about}>
          <div className={styles.name}>{manifest.name}</div>
          <div className={styles.description}>{manifest.description}</div>
        </div>
        <div className={styles.howToInstruction}>
          <div className={styles.instructionStep}>
            <div className={styles.svgWrap}>
              <SafariIcon className={styles.svgSafari} />
            </div>
            <div className={styles.stepText}>{t(translations['1'])}</div>
          </div>
          <div className={styles.instructionStep}>
            <div className={styles.svgWrap}>
              <ShareIcon className={styles.svgShare} />
            </div>
            <div className={styles.stepText}>{t(translations['2'])}</div>
          </div>
          <div className={styles.instructionStep}>
            <div className={styles.svgWrap}>
              <AddIcon className={styles.svgAdd} />
            </div>
            <div className={styles.stepText}>{t(translations['3'])}</div>
          </div>
        </div>
      </div>
    </BottomSheetIos>
  );
});
