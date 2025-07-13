import { useState, useEffect } from 'react'
import Person  from './components/Persons'
import PersonForm  from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import numberServices from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('type name')
  const [newNumber, setNewNumber ] = useState('type number')
  const [searchText, setSearchText] = useState('search name')
  const [ alertText, setAlertText ] = useState(null)
  const [ warning, setWarning ] = useState(false)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const searchActive = searchText !== 'search name'
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))
  const activePersons = searchActive ? filteredPersons : persons

  useEffect(() => {
    numberServices
      .getAll()
      .then(response => {
      setPersons(response)
    })
  },[])

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.find(((person) => newName === person.name)) == undefined ) {
      const newPerson = {name: newName, number:newNumber}
      numberServices
        .create(newPerson)
        .then(response => { 
          setPersons(persons.concat(response))
        })
        .then(setAlert(`Added ${newName}`,false))
    }
    else {
      if (window.confirm(`${newName} is already added to phone book. Do you want to update number?`)){
        const personToAmend = persons.find(person => newName === person.name)
        numberServices
          .update({...personToAmend, number:newNumber})
          .then(amendedPerson => {
            setPersons(
              persons.map(person => person.id === amendedPerson.id ? amendedPerson : person)
            )}
          )
          .catch(error => 

            setAlert(`Information for ${newName} has already been removed from the server`,true)
          )
          .then(setAlert(`Updated number for ${newName}`,false))
          
      }
      else {
        console.log('Number not updated')
      }
    }
  }

  const handleSearch = (event) => {
    const newSearchText = setSearchText(event.target.value)
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    console.log(person)
    if (window.confirm(`Do you want to delete ${person.name}`)){
      numberServices
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id ))
        })
        .then(setAlert(`Removed: ${person.name}`,false))
    } else {
      console.log('Cancel delete operation')
    }
  }

  const setAlert = (message,warningBool) => {
    setWarning(warningBool)
    setAlertText(message)
    setTimeout(() => setAlertText(null), 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertText} warning={warning} />
      <Filter searchText={searchText} onChange={handleSearch} />
      <h2>Add new</h2>
      <PersonForm onSubmit={addNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} newName={newName} newNumber={newNumber}/>
  
      <h2>Numbers</h2>
      <ul>
        {activePersons.map(person => 
          <Person key={person.name} person={person} removePerson={() => removePerson(person.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App