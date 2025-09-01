import axios from 'axios';
import { getConfig } from './requests';
const baseUrl = '/api/blogs';

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

const getOne = async (id) => {
  const config = getConfig();
  const res = await axios.get(`${baseUrl}/${id}`, config);
  return res.data;
};

const createComment = async (id, comment) => {
  const config = getConfig();
  const res = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  );
  return res.data;
};

export default { createComment, getOne, getAll, create, update, remove };
