import { useState } from 'react';
import { type NewDiaryEntry } from '../types';
import {
  type Visibility,
  type Weather,
  weathers,
  visibilities,
} from '../types';

type Props = {
  addDiary: (entry: NewDiaryEntry) => void;
};

const DiaryForm = ({ addDiary }: Props) => {
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('good');
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addDiary({ weather, visibility, date, comment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Weather: </label>
      {weathers.map((w, idx) => (
        <span key={idx}>
          <input
            name="weather"
            type="radio"
            value={w}
            onChange={() => setWeather(w as Weather)}
          />
          <label>{w}</label>
        </span>
      ))}

      <div>
        <label>Visibility: </label>
        {visibilities.map((v, idx) => (
          <span key={idx}>
            <input
              key={idx}
              name="visibility"
              type="radio"
              value={v}
              onChange={() => setVisibility(v as Visibility)}
            />
            <label>{v}</label>
          </span>
        ))}
      </div>
      <div>
        <label>Date: </label>
        <input
          name="date"
          placeholder="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <input
        name="comment"
        placeholder="comment"
        type="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit"> submit </button>
    </form>
  );
};

export default DiaryForm;
