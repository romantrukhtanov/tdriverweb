const loadedUrls = new Set<string>();

export const importScript = (resourceUrl: string): Promise<void> => {
  if (loadedUrls.has(resourceUrl)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.onerror = reject;
    script.onload = () => {
      script.onload = null;
      loadedUrls.add(resourceUrl);
      resolve();
    };
    script.src = resourceUrl;
    document.head.appendChild(script);
  });
};
