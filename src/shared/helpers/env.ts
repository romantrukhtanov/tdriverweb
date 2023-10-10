export const checkIsProduction = () => process.env.NODE_ENV === 'production';
export const checkIsDev = () => process.env.NODE_ENV === 'development';
export const checkIsLocalhost = () =>
  window.location.hostname === 'localhost' || window.location.hostname.startsWith('192.168.');

export const IS_PRODUCTION = checkIsProduction();
export const IS_LOCALHOST = checkIsLocalhost();
export const IS_DEV = checkIsDev();
