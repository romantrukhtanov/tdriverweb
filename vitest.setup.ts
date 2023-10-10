window.matchMedia = () => {
  return {
    dispatchEvent() {
      return false;
    },
    media: '',
    onchange() {},
    addEventListener() {},
    removeEventListener() {},
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

window.localStorage.setItem('i18nextLng', 'ru');

export {};
