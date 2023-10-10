import fs from 'fs';
import { I18N_FOLDER } from './constants';

export const mockLocalesFolder = () => {
  if (fs.existsSync(I18N_FOLDER)) {
    return;
  }

  fs.mkdirSync(I18N_FOLDER);
};

mockLocalesFolder();
