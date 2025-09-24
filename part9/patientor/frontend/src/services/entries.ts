import axios, { AxiosError } from 'axios';
import { EntryFormValues, Entry } from '../types';

import { apiBaseUrl } from '../constants';

const create = async (patientId: string, object: EntryFormValues) => {
  try {
    const res = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      object
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      throw new Error(error.response?.data?.error[0].message);
    } else {
      throw new Error(String(error));
    }
  }
};

export default {
  create,
};
