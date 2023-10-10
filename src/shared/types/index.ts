type BaseType = string | number | boolean;
type BrandType = string | symbol;
const Brand: unique symbol = Symbol('Brand');
export type WithBrand<TBaseType extends BaseType, TBrand extends BrandType> = TBaseType & {
  readonly [Brand]: TBrand;
};

export type Minutes = WithBrand<number, 'Minutes'>;
export type TimestampSeconds = WithBrand<number, 'TimestampSeconds'>;
export type TimestampMilliseconds = WithBrand<number, 'TimestampMilliseconds'>;
