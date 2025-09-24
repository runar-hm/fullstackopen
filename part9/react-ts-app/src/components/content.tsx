import { type CoursePart } from '../App';
import Part from './part';

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return parts.map((p, idx) => (
    <div key={idx}>
      <h3>
        {' '}
        {p.name} {p.exerciseCount}{' '}
      </h3>
      <Part part={p} />
    </div>
  ));
};

export default Content;
