import { type DiaryEntry, type NewDiaryEntry } from '../types';
import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((res) => {
    return res.data;
  });
};

const createEntry = (entry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, entry)
    .then((res) => res.data)
    .catch((e) => {
      if (axios.isAxiosError(e)) {
        console.log(e);
        throw new Error(e.response?.data.error[0].message || e.message);
      } else {
        console.log(e);
        throw new Error(e);
      }
    });
};

export default {
  getAll,
  createEntry,
};
