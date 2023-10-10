import React, { Fragment } from 'react';
import { linkTo } from '@storybook/addon-links';
import type { Meta, StoryObj } from '@storybook/react';

import * as icons from 'shared/view/components/icons';

import styles from './IconsList.module.scss';

type IconName = keyof typeof icons;

const iconsList = (Object.keys(icons) as Array<IconName>).sort((a, b) => a.localeCompare(b));

type IconProps = Partial<Record<IconName, Array<string>>>;
declare const VITE_ICON_PROPS: IconProps;
const iconProps: IconProps = (() => {
  try {
    return VITE_ICON_PROPS;
  } catch {
    // no vite
  }
  try {
    return JSON.parse(process.env.ICON_PROPS!) as IconProps;
  } catch {
    return {};
  }
})();

export default {
  title: 'Shared/Icons/IconsList',
} satisfies Meta<unknown>;

export const IconsList: StoryObj<unknown> = {
  render: () => {
    return (
      <div className={styles.iconsList}>
        {iconsList.map(name => {
          const Icon = icons[name];
          const props = iconProps[name];
          return (
            <div key={name} className={styles.iconBlock}>
              <Icon />
              <div className={styles.label}>
                {props && props.length > 0 ? (
                  <>
                    {hasExtraProps(props) ? (
                      <button
                        type="button"
                        className={styles.link}
                        onClick={linkTo(`Shared/Icons/${name}`)}
                      >
                        {name}
                      </button>
                    ) : (
                      name
                    )}
                    <div className={styles.propsList}>
                      {props.map((prop, index) => (
                        <Fragment key={prop}>
                          <code className={styles.propName}>{prop}</code>
                          {index + 1 < props.length && <>, </>}
                        </Fragment>
                      ))}
                    </div>
                  </>
                ) : (
                  name
                )}
              </div>
            </div>
          );
        })}
      </div>
    );

    function hasExtraProps(props: string[]): boolean {
      return props.some(propName => !['className', 'ref'].includes(propName));
    }
  },

  parameters: {
    actions: { disable: true },
    controls: { disable: true },
  },
};
