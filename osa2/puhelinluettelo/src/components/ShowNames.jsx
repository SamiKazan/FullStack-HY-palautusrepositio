const ShowNames = ({namesToShow, handleRemove}) => {
    return (
      <ul>
          {namesToShow.map(person => 
            <li key={person.name}>
              {person.name} {person.number}
              <button onClick={() => handleRemove(person.id)}>delete</button>
            </li>)}
      </ul>
    )
  }

export default ShowNames