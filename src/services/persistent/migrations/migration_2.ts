import type { SetItem, GetItem } from '../model';

/**
 * Copy bot interval value to more accurate name
 */
export function migrate(setItem: SetItem, getItem: GetItem) {
  const value = getItem('tradingView.chart.interval');
  if (value) {
    setItem('tradingView.chart.interval.bots', value);
  }
}
