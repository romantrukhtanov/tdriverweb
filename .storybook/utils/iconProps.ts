import fs from 'fs';

import { parse } from 'react-docgen-typescript';

const docGenIconsInfo = parse(
  fs
    .readdirSync('src/shared/view/components/icons', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .map(name => `src/shared/view/components/icons/${name}/${name}.tsx`),
);

export const iconProps = Object.fromEntries(
  docGenIconsInfo.map(({ displayName, props }) => {
    delete props.key;
    return [displayName, Object.keys(props)];
  }),
);
