import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';
import diaryEntries from '../../data/entries';

const getEntries = (): DiaryEntry[] => {
  return diaryEntries;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaryEntries.find((d) => d.id === id);
  return entry;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaryEntries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaryEntries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
