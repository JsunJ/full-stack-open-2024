import Person from './Person'

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          deletePerson={() => handleDelete(person.id)}
        />
      )}
    </div>
  );
}

export default Persons