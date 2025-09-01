import axios from 'axios';
import { getConfig } from './requests';

const baseUrl = '/api/users';

export const getAll = async () => {
  const config = getConfig();
  const res = await axios.get(baseUrl, config);
  return res.data;
};

export const getOne = async (id) => {
  const config = getConfig();
  const res = await axios.get(`${baseUrl}/${id}`, config);
  return res.data;
};

export default { getAll, getOne };
