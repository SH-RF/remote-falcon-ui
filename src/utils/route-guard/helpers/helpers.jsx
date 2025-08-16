const controlPanelSubdomain = 'controlpanel';
const env = window._env_ || {};

export const getSubdomain = () => {
  const swapCP = env.VITE_SWAP_CP === 'true';
  const hostname = window.location.hostname;
  const hostnameSplit = hostname.split('.');
  return swapCP ?
    env.VITE_VIEWER_PAGE_SUBDOMAIN :
    hostnameSplit.length > env.VITE_HOSTNAME_PARTS ? hostnameSplit[0] : '';
};

export const isSubdomainCP = () => {
  const hostname = window.location.hostname;
  const hostnameSplit = hostname.split('.');
  const subdomain = hostnameSplit.length > env.VITE_HOSTNAME_PARTS ? hostnameSplit[0] : '';
  return subdomain === controlPanelSubdomain;
}

export const isExternalViewer = () => {
  const swapCP = env.VITE_SWAP_CP === 'true';
  console.log("swapCP: ", swapCP);
  const subdomain = getSubdomain();
  if(swapCP && !isSubdomainCP()) {
    return true;
  }else if(!swapCP) {
    return !!subdomain;
  }
};