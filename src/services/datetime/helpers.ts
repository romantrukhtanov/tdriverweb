/* eslint-disable no-restricted-imports */
import * as dateFns from 'date-fns';
import * as dateFnsTZ from 'date-fns-tz';
import * as R from 'remeda';

import type { TimestampMilliseconds, TimestampSeconds } from 'shared/types';
import { exhaustiveCheck } from 'shared/helpers/exhaustiveCheck';

import type { DateInput, DurationType } from './model';
import { UnitOfTime, TIMEZONE_UTC } from './constants';

export function date(inputRaw?: DateInput | string, options?: dateFnsTZ.OptionsWithTZ): Date {
  if (inputRaw instanceof Date) {
    return new Date(inputRaw);
  }
  const input = inputRaw ?? new Date();
  return dateFnsTZ.toDate(input, options);
}

export function dateUTC(input: DateInput | string): Date {
  return date(input, { timeZone: TIMEZONE_UTC });
}

export function dateUnix(timestamp: TimestampSeconds): Date {
  return dateFns.fromUnixTime(timestamp);
}

export function getTime(input?: DateInput): TimestampMilliseconds {
  return (input ? dateFns.getTime(input) : Date.now()) as TimestampMilliseconds;
}

export function getUnixTime(input?: DateInput): TimestampSeconds {
  return Math.floor(getTime(input) / 1000) as TimestampSeconds;
}

export function getDuration(start: Date, end: Date): DurationType {
  return dateFns.intervalToDuration({ start, end });
}

function validateMilliseconds(milliseconds: TimestampMilliseconds) {
  const year = new Date(milliseconds).getFullYear();
  const outOfRange = year < 2010 || year > 2099;

  if (outOfRange) {
    console.error(`${milliseconds} is not a valid TimestampMilliseconds`);
  }
}

export function secToMs(seconds: TimestampSeconds): TimestampMilliseconds {
  const milliseconds = (seconds * 1000) as TimestampMilliseconds;

  if (process.env.NODE_ENV !== 'production') {
    validateMilliseconds(milliseconds);
  }

  return milliseconds;
}

export function msToSec(milliseconds: TimestampMilliseconds): TimestampSeconds {
  if (process.env.NODE_ENV !== 'production') {
    validateMilliseconds(milliseconds);
  }

  return Math.floor(milliseconds / 1000) as TimestampSeconds;
}

export function add(
  input: DateInput,
  duration: Partial<Record<Exclude<UnitOfTime, UnitOfTime.MILLISECONDS>, number>>,
): Date {
  return dateFns.add(input, {
    years: duration[UnitOfTime.YEARS],
    months: duration[UnitOfTime.MONTHS],
    weeks: duration[UnitOfTime.WEEKS],
    days: duration[UnitOfTime.DAYS],
    hours: duration[UnitOfTime.HOURS],
    minutes: duration[UnitOfTime.MINUTES],
    seconds: duration[UnitOfTime.SECONDS],
  });
}

export function subtract(
  input: DateInput,
  amount: number,
  unitOfTime: UnitOfTime = UnitOfTime.MILLISECONDS,
): Date {
  switch (unitOfTime) {
    case UnitOfTime.MILLISECONDS:
      return dateFns.subMilliseconds(input, amount);
    case UnitOfTime.SECONDS:
      return dateFns.subSeconds(input, amount);
    case UnitOfTime.MINUTES:
      return dateFns.subMinutes(input, amount);
    case UnitOfTime.HOURS:
      return dateFns.subHours(input, amount);
    case UnitOfTime.DAYS:
      return dateFns.subDays(input, amount);
    case UnitOfTime.WEEKS:
      return dateFns.subWeeks(input, amount);
    case UnitOfTime.MONTHS:
      return dateFns.subMonths(input, amount);
    case UnitOfTime.QUARTERS:
      return dateFns.subQuarters(input, amount);
    case UnitOfTime.YEARS:
      return dateFns.subYears(input, amount);
    default:
      exhaustiveCheck(unitOfTime);
  }
}

export function format(
  input: DateInput,
  dateFormat: string,
  options?: dateFnsTZ.OptionsWithTZ,
): string {
  return dateFnsTZ.format(date(input), dateFormat, options);
}

export function getUnit(
  input: DateInput,
  unitOfTime: UnitOfTime = UnitOfTime.MILLISECONDS,
): number {
  switch (unitOfTime) {
    case UnitOfTime.MILLISECONDS:
      return dateFns.getMilliseconds(input);
    case UnitOfTime.SECONDS:
      return dateFns.getSeconds(input);
    case UnitOfTime.MINUTES:
      return dateFns.getMinutes(input);
    case UnitOfTime.HOURS:
      return dateFns.getHours(input);
    case UnitOfTime.DAYS:
      return dateFns.getDay(input);
    case UnitOfTime.WEEKS:
      return dateFns.getWeek(input);
    case UnitOfTime.MONTHS:
      return dateFns.getMonth(input);
    case UnitOfTime.QUARTERS:
      return dateFns.getQuarter(input);
    case UnitOfTime.YEARS:
      return dateFns.getYear(input);
    default:
      exhaustiveCheck(unitOfTime);
  }
}

export function diff(
  dateLater: DateInput, // later
  dateEarlier: DateInput, // earlier
  unitOfTime: UnitOfTime = UnitOfTime.MILLISECONDS,
): number {
  switch (unitOfTime) {
    case UnitOfTime.MILLISECONDS:
      return dateFns.differenceInMilliseconds(dateLater, dateEarlier);
    case UnitOfTime.SECONDS:
      return dateFns.differenceInSeconds(dateLater, dateEarlier);
    case UnitOfTime.MINUTES:
      return dateFns.differenceInMinutes(dateLater, dateEarlier);
    case UnitOfTime.HOURS:
      return dateFns.differenceInHours(dateLater, dateEarlier);
    case UnitOfTime.DAYS:
      return dateFns.differenceInDays(dateLater, dateEarlier);
    case UnitOfTime.WEEKS:
      return dateFns.differenceInWeeks(dateLater, dateEarlier);
    case UnitOfTime.MONTHS:
      return dateFns.differenceInMonths(dateLater, dateEarlier);
    case UnitOfTime.QUARTERS:
      return dateFns.differenceInQuarters(dateLater, dateEarlier);
    case UnitOfTime.YEARS:
      return dateFns.differenceInYears(dateLater, dateEarlier);
    default:
      exhaustiveCheck(unitOfTime);
  }
}

export function startOf(
  input: DateInput,
  unitOfTime: Exclude<UnitOfTime, UnitOfTime.MILLISECONDS> = UnitOfTime.SECONDS,
): Date {
  switch (unitOfTime) {
    case UnitOfTime.SECONDS:
      return dateFns.startOfSecond(input);
    case UnitOfTime.MINUTES:
      return dateFns.startOfMinute(input);
    case UnitOfTime.HOURS:
      return dateFns.startOfHour(input);
    case UnitOfTime.DAYS:
      return dateFns.startOfDay(input);
    case UnitOfTime.WEEKS:
      return dateFns.startOfWeek(input);
    case UnitOfTime.MONTHS:
      return dateFns.startOfMonth(input);
    case UnitOfTime.QUARTERS:
      return dateFns.startOfQuarter(input);
    case UnitOfTime.YEARS:
      return dateFns.startOfYear(input);
    default:
      exhaustiveCheck(unitOfTime);
  }
}

export function endOf(
  input: DateInput,
  unitOfTime: Exclude<UnitOfTime, UnitOfTime.MILLISECONDS> = UnitOfTime.SECONDS,
): Date {
  switch (unitOfTime) {
    case UnitOfTime.SECONDS:
      return dateFns.endOfSecond(input);
    case UnitOfTime.MINUTES:
      return dateFns.endOfMinute(input);
    case UnitOfTime.HOURS:
      return dateFns.endOfHour(input);
    case UnitOfTime.DAYS:
      return dateFns.endOfDay(input);
    case UnitOfTime.WEEKS:
      return dateFns.endOfWeek(input);
    case UnitOfTime.MONTHS:
      return dateFns.endOfMonth(input);
    case UnitOfTime.QUARTERS:
      return dateFns.endOfQuarter(input);
    case UnitOfTime.YEARS:
      return dateFns.endOfYear(input);
    default:
      exhaustiveCheck(unitOfTime);
  }
}

export function startOfUtc(
  input: DateInput,
  unitOfTime: Exclude<
    UnitOfTime,
    UnitOfTime.MILLISECONDS | UnitOfTime.WEEKS | UnitOfTime.QUARTERS
  > = UnitOfTime.SECONDS,
): Date {
  const copy = date(input);

  switch (unitOfTime) {
    case UnitOfTime.YEARS:
      copy.setUTCMonth(0, 1);
      copy.setUTCHours(0, 0, 0, 0);
      break;
    case UnitOfTime.MONTHS:
      copy.setUTCDate(1);
      copy.setUTCHours(0, 0, 0, 0);
      break;
    case UnitOfTime.DAYS:
      copy.setUTCHours(0, 0, 0, 0);
      break;
    case UnitOfTime.HOURS:
      copy.setUTCHours(copy.getUTCHours(), 0, 0, 0);
      break;
    case UnitOfTime.MINUTES:
      copy.setUTCHours(copy.getUTCHours(), copy.getUTCMinutes(), 0, 0);
      break;
    case UnitOfTime.SECONDS:
      copy.setUTCHours(copy.getUTCHours(), copy.getUTCMinutes(), copy.getUTCSeconds(), 0);
      break;
    default:
      exhaustiveCheck(unitOfTime);
  }

  return copy;
}

export function endOfUtc(
  input: DateInput,
  unitOfTime: Exclude<
    UnitOfTime,
    UnitOfTime.MILLISECONDS | UnitOfTime.WEEKS | UnitOfTime.QUARTERS
  > = UnitOfTime.SECONDS,
): Date {
  return subtract(
    add(startOfUtc(input, unitOfTime), { [unitOfTime]: 1 }),
    1,
    UnitOfTime.MILLISECONDS,
  );
}

export function isToday(input: DateInput = date()): boolean {
  return dateFns.isToday(input);
}

export function isAfter(input: DateInput, inputToCompare: DateInput): boolean {
  return dateFns.isAfter(input, inputToCompare);
}

export function isBefore(input: DateInput, inputToCompare: DateInput): boolean {
  return dateFns.isBefore(input, inputToCompare);
}

export function isSame(dateLeft: DateInput, dateRight: DateInput, unitOfTime: UnitOfTime): boolean {
  switch (unitOfTime) {
    case UnitOfTime.MILLISECONDS:
      return dateFns.isEqual(dateLeft, dateRight);
    case UnitOfTime.SECONDS:
      return dateFns.isSameSecond(dateLeft, dateRight);
    case UnitOfTime.MINUTES:
      return dateFns.isSameMinute(dateLeft, dateRight);
    case UnitOfTime.HOURS:
      return dateFns.isSameHour(dateLeft, dateRight);
    case UnitOfTime.DAYS:
      return dateFns.isSameDay(dateLeft, dateRight);
    case UnitOfTime.WEEKS:
      return dateFns.isSameWeek(dateLeft, dateRight);
    case UnitOfTime.MONTHS:
      return dateFns.isSameMonth(dateLeft, dateRight);
    case UnitOfTime.QUARTERS:
      return dateFns.isSameQuarter(dateLeft, dateRight);
    case UnitOfTime.YEARS:
      return dateFns.isSameYear(dateLeft, dateRight);
    default:
      exhaustiveCheck(unitOfTime);
  }
}

export function isSameOrAfter(dateLeft: DateInput, dateRight: DateInput, unitOfTime: UnitOfTime) {
  return isSame(dateLeft, dateRight, unitOfTime) || isAfter(dateLeft, dateRight);
}

export function isSameOrBefore(dateLeft: DateInput, dateRight: DateInput, unitOfTime: UnitOfTime) {
  return isSame(dateLeft, dateRight, unitOfTime) || isBefore(dateLeft, dateRight);
}

/**
 * @deprecated the start of the hour is incorrectly determined when transition the time one hour ahead, @see https://github.com/date-fns/date-fns/issues/2068
 * for this reason, two different hours can have the same start of the hour
 */
export function startsOfInterval(
  dateStart: DateInput,
  dateEnd: DateInput,
  unitOfTime: Exclude<UnitOfTime, UnitOfTime.MILLISECONDS>,
): Array<TimestampMilliseconds> {
  const firstTime = startOf(dateStart, unitOfTime);
  const beforeTime = endOf(dateEnd, unitOfTime);
  const result: Array<TimestampMilliseconds> = [];
  let time = firstTime;
  do {
    result.push(getTime(startOf(getTime(time), unitOfTime)));
    time = add(time, { [unitOfTime]: 1 });
  } while (isBefore(time, beforeTime));
  return R.uniq(result);
}
