import { type CoursePart } from '../App';

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case 'basic':
      return <p>{part.description}</p>;
    case 'group':
      return (
        <>
          {' '}
          <p>group projects: {part.groupProjectCount}</p>
        </>
      );
    case 'background':
      return (
        <>
          <p>{part.description}</p>
          <p>background material: {part.backgroundMaterial}</p>
        </>
      );
    case 'special':
      return (
        <>
          <p>{part.description}</p>
          <p>{part.requirements.join(', ')}</p>
        </>
      );
  }
};

export default Part;
