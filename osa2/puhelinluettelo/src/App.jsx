import { useState, useEffect } from 'react'
import noteServices from './services/people'
import './index.css'

import Notification from './components/Notification'
import RenderNameInput from './components/RenderNameInput'
import ShowNames from './components/ShowNames'
import RenderFilter from './components/RenderFilter'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filters, setFilters] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log("works")
    noteServices
      .getAll()
      .then((returnPerson) => {
        setPersons(returnPerson)
      })
  },[])
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const currentPerson = persons.find(person => person.name === newName)
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${currentPerson.name} is already in phonebook, replace old number with new one?`)){
        
        const updatedPerson = { ...currentPerson, number: newNumber }
        noteServices
          .update(currentPerson.id, updatedPerson)

          .then(response => {
            setPersons(persons.map(person => person.id !== currentPerson.id
              ? person
              : response))
              setMessage(`Changed number of ${currentPerson.name}`)
              setTimeout(() => {
                  setMessage(null)
              }, 5000)
          })
          .catch(error => {
            setMessage(`Error: Info of ${currentPerson.name} has already been removed`)
              setTimeout(() => {
                  setMessage(null)
              }, 5000)
          })
      }
      
      setNewName('')
      setNewNumber('')
    }
    else {
      noteServices
      .add(nameObject)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
              setMessage(null)
          }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilters(event.target.value)
  }

  const handleRemove = (id) => {
    const currentName = persons.find(person => person.id === id)
    if (window.confirm(`Do you want to remove this number?`)) {
      noteServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Removed ${currentName.name}`)
          setTimeout(() => {
              setMessage(null)
          }, 5000)
        })
    }
  }

  const namesToShow = filters
  ? persons.filter(person => person.name.toUpperCase().includes(filters.toUpperCase()))
  : persons;


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <RenderFilter
      filters={filters}
      handleFilterChange={handleFilterChange}/>

      <h2>Add new</h2>
      <RenderNameInput
      newName={newName}
      newNumber={newNumber}
      addName={addName}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ShowNames namesToShow={namesToShow} handleRemove={handleRemove}/>
      ...
    </div>
  )

}

export default App