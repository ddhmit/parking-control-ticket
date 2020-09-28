import { isProd } from './env';

const disableReactDevTools = () => {
  const noop = () => undefined;
  // @ts-ignore
  const DEV_TOOLS = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (typeof DEV_TOOLS === 'object') {
    for (const [key, value] of Object.entries(DEV_TOOLS)) {
      DEV_TOOLS[key] = typeof value === 'function' ? noop : null;
    }
  }
};

/**
 * 生产环境关闭 react devtool
 */
if (isProd()) {
  disableReactDevTools();
}
