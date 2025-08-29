import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

export const setToken = (newToken) => {
  newToken ? (token = newToken) : (token = null);
};

export const getConfig = () => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  return config;
};

const getAll = () => {
  const config = getConfig();

  const res = axios.get(baseUrl, config);
  return res.then((response) => response.data);
};

const create = async (blog) => {
  const config = getConfig();

  const res = await axios.post(baseUrl, blog, config);

  return res.data;
};

const update = async (blog) => {
  const config = getConfig();

  const url = `${baseUrl}/${blog.id}`;
  const res = await axios.put(url, blog, config);

  return res.data;
};

const remove = async (blog) => {
  const config = getConfig();
  const url = `${baseUrl}/${blog.id}`;
  const res = await axios.delete(url, config);

  return res;
};

export default { setToken, getAll, create, update, remove };
