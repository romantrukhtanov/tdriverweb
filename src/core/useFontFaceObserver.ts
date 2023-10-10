import { useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';

const FONT_FAMILY = 'Jost';

export function useFontFaceObserver() {
  useEffect(() => {
    // fix MUI wrong styles before font loading
    // https://github.com/mui-org/material-ui/issues/16465
    // https://github.com/mui-org/material-ui/issues/9337#issuecomment-413789329
    new FontFaceObserver(FONT_FAMILY)
      // https://stackoverflow.com/questions/57051565/prefetch-works-but-throws-an-uncaught-in-promise-error
      .load(null, 15000)
      .then(() => window.dispatchEvent(new CustomEvent('resize')))
      .catch(() => window.dispatchEvent(new CustomEvent('resize')));
  }, []);
}
