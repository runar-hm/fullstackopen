import { type DiaryEntry } from '../types';

const DiariesList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <>
      <h3>Hello</h3>
      {diaries.map((d) => {
        return (
          <div key={d.id}>
            <h4>{d.date}</h4>
            <p>Visibility {d.visibility}</p>
            <p>Weather: {d.weather}</p>
          </div>
        );
      })}
    </>
  );
};

export default DiariesList;
