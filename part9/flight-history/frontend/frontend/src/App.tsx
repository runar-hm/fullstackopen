import { useState, useEffect } from 'react';
import DiariesList from './components/DiariesList';
import DiaryForm from './components/DiaryForm';

import { type DiaryEntry, type NewDiaryEntry } from './types';
import diariesService from './services/diaries';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    diariesService.getAll().then((data) => setDiaryEntries(data));
  }, []);

  const Notification = () => {
    return <p style={{ color: 'red' }}>{msg}</p>;
  };

  const addDiary = (entry: NewDiaryEntry) => {
    diariesService
      .createEntry(entry)
      .then((saved) => setDiaryEntries([...diaryEntries, saved]))
      .catch((error) => {
        if (error instanceof Error) {
          setMsg(`Diary not updated. Errormsg: ${error}`);
        } else {
          setMsg('Something went wrong');
        }
      });
  };

  return (
    <>
      <h1>Diaries</h1>
      <Notification />
      <h2>Add new entry</h2>
      <DiaryForm addDiary={addDiary} />
      <DiariesList diaries={diaryEntries} />
    </>
  );
}

export default App;
