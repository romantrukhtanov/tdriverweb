import { useState, useCallback, useEffect, useRef } from 'react';

type Options = {
  timeout?: number;
};

const DEFAULT_OPTIONS: Options = {
  timeout: 500,
};

// eslint-disable-next-line compat/compat -- availability checked before using
const isSupportClipboardApi = Boolean(navigator.clipboard?.writeText);

// TODO: may be removed when Safari support will be downgraded to 13.1 or above and iOS to 14 or above
const copyToClipboardLegacy = (text: string) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const copyToClipboardModern = (text: string) => {
  // eslint-disable-next-line compat/compat -- availability checked before using
  window.navigator.clipboard.writeText(text);
};

const copyToClipboard = isSupportClipboardApi ? copyToClipboardModern : copyToClipboardLegacy;

const useCopyToClipboard = <T>(
  initDescriptor: T,
  options: Options = {},
): [descriptor: T, copy: (text: string, newDescriptor: T) => void, wasCopied: boolean] => {
  const timer = useRef<number>();
  const [descriptor, setDescriptor] = useState(initDescriptor);
  const [wasCopied, setWasCopied] = useState(false);
  const { timeout } = { ...DEFAULT_OPTIONS, ...options };

  useEffect(() => () => clearTimeout(timer.current), [initDescriptor]);

  const copy = useCallback(
    (text: string, newDescriptor: T) => {
      copyToClipboard(text);
      setDescriptor(newDescriptor);
      setWasCopied(true);
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setDescriptor(initDescriptor), timeout);
    },
    [initDescriptor, setDescriptor, timeout],
  );

  return [descriptor, copy, wasCopied];
};

export { copyToClipboard, useCopyToClipboard };
