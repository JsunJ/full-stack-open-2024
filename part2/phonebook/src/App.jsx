import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);

    if (names.includes(newName)) {
      const id = persons.find(person => person.name === newName).id;
      handleUpdate(id);
    } else {
      const person = {
        name: newName,
        number: newNumber,
      }

      phonebookService
        .addPerson(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setSuccessMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id);
    const confirmation = confirm(`Delete ${person.name} ?`);

    if (confirmation) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
    }
  }

  const handleUpdate = (id) => {
    const person = persons.find(person => person.id === id);
    const confirmation = confirm(`${person.name} is already added to the phonebook. Replace the old number with a new one?`);

    if (confirmation) {
      const changedPerson = { ...person, number: newNumber };

      phonebookService
        .updatePerson(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App