import axios from '../../utils/axios';

const env = window._env_ || {};

// eslint-disable-next-line import/prefer-default-export
export const fetchGitHubIssuesService = async () => {
  const response = await axios.get(`${env.VITE_CONTROL_PANEL_API}/controlPanel/gitHubIssues`);
  return response;
};