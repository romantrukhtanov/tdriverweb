/**
 * Clamp the given value within the inclusive min and max bounds.
 * @param value the number
 * @param limits the bounds limits
 * @signature
 *    clamp({ min, max })(value);
 * @example
 *    clamp(10, { min: 30 }) // => 30
 *    clamp(20, { max: 2 }) // => 2
 *    clamp(10, { max: 55 }) // => 10
 *    clamp(10, { max: 20, min: 5 }) // => 10
 * @dataLast
 * @category Number
 */

export function clamp(value: number, limits?: { min?: number; max?: number }) {
  if (!limits) {
    return value;
  }

  if (limits.min != null) {
    if (limits.min > value) {
      return limits.min;
    }
  }
  if (limits.max != null) {
    if (limits.max < value) {
      return limits.max;
    }
  }
  return value;
}
