export const JWT_API = {
  secret: 'secret',
  timeout: '30 days'
};

export const BASE_PATH = '';

export const CONTROL_PANEL_PATH = '/control-panel';

const env = window._env_ || {};

export const VERSION = env.VITE_VERSION;

const config = {
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 8,
  outlinedFilled: false,
  navType: 'dark',
  presetColor: 'theme3',
  locale: 'en',
  rtlLayout: false,
  container: true
};

export default config;