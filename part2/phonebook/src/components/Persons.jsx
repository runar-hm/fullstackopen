const Person = ({person, removePerson}) => <li> {person.name} {person.number} <button onClick={removePerson}>Delete</button></li>

export default Person