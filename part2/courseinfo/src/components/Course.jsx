const Header = ({coursename}) => <h2>{coursename}</h2>

const Part = ({part}) => <p key={part.id}>{part.name} {part.exercises}</p>

const Total = ({total}) => <p>total of {total}</p>

const Course = ({course}) => {
  const exercisesSum = course.parts.reduce((sum, part) => sum + part.exercises,0)

  return(
    <>
    <div>
    <Header coursename={course.name} />
    {course.parts.map(part => <Part key={part.id} part={part}/>)}
    <Total total={exercisesSum} />
    </div>
    </>
  )
}

export default Course