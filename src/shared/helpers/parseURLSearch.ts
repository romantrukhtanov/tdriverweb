type NullableObjectByKeys<TKeys extends string> = {
  [TKey in TKeys]: string | null;
};

export function parseURLSearch<TKeys extends string>(search: string = window.location.search) {
  const p = new URLSearchParams(search);
  return new Proxy({} as NullableObjectByKeys<TKeys>, { get: (_, param: string) => p.get(param) });
}
