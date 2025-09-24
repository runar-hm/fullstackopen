import { Diagnosis } from '../types';
import diagnosisEntries from '../data/diagnoses';

const getAll = (): Diagnosis[] => {
  return diagnosisEntries;
};

export default {
  getAll,
};
