import axios from '../../../../utils/axios';

const env = window._env_ || {};

export const uploadImageService = async (formData) =>
  axios.post(`${env.VITE_CONTROL_PANEL_API}/controlPanel/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const getImagesService = async () => axios.get(`${env.VITE_CONTROL_PANEL_API}/controlPanel/images`);

export const deleteImageService = async (imageName) =>
  axios.delete(`${env.VITE_CONTROL_PANEL_API}/controlPanel/image/${imageName}`);