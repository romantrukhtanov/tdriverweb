import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { date, getTime, getDuration, DateInput } from 'services/datetime';
import { useRepeatableCallback } from 'shared/view/hooks/useRepeatableCallback';

import styles from './Countdown.module.scss';

type ShowOptions = {
  days?: boolean;
  hours?: boolean;
  minutes?: boolean;
  seconds?: boolean;
};

type Props = {
  completedAt: DateInput;
  finishedAt: DateInput;
  showOptions?: ShowOptions;
  isFinished?: boolean;
  onComplete?(): void;
};

const SECOND_INTERVAL = 1000;

export const Countdown = observer(function Countdown({
  completedAt,
  finishedAt,
  showOptions,
  isFinished,
  onComplete,
}: Props) {
  const timeLeft = getTimeLeft();
  const [days, setDays] = useState(timeLeft.days);
  const [hours, setHours] = useState(timeLeft.hours);
  const [minutes, setMinutes] = useState(timeLeft.minutes);
  const [seconds, setSeconds] = useState(timeLeft.seconds);

  const [onStart, onStop] = useRepeatableCallback(setTime, SECOND_INTERVAL, 0);

  useEffect(onStart, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isFinished) {
      onStop();
    }
  }, [isFinished]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.root}>
      {showOptions?.days && renderTimeBlock(days, 'right', showOptions?.hours)}
      {showOptions?.hours && renderTimeBlock(hours, 'right', showOptions?.minutes)}
      {showOptions?.minutes && renderTimeBlock(minutes, 'right', showOptions?.seconds)}
      {showOptions?.seconds && renderTimeBlock(seconds, 'left', false)}
    </div>
  );

  function setTime() {
    const left = getTimeLeft();

    setDays(left.days);
    setHours(left.hours);
    setMinutes(left.minutes);
    setSeconds(left.seconds);

    if (getTime() > getTime(completedAt) && !isFinished) {
      onStop();
      resetCountdown();
      onComplete?.();
    }
  }

  function resetCountdown() {
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  function renderTimeBlock(value: number, alignment: 'left' | 'right', withDots = true) {
    const valueFormatted = value > 9 ? value : `0${value}`;
    return (
      <div className={cn(styles.value, styles[alignment])}>
        {valueFormatted}
        {withDots && ':'}
      </div>
    );
  }

  function getTimeLeft() {
    const duration = getDuration(isFinished ? date(finishedAt) : date(), date(completedAt));
    return {
      days: duration.days ?? 0,
      hours: duration.hours ?? 0,
      minutes: duration.minutes ?? 0,
      seconds: duration.seconds ?? 0,
    };
  }
});
