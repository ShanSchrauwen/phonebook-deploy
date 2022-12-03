import { useEffect, useState } from 'react';
import { getAll, create, update, remove } from './services/server';
import { Add } from './components/Add';
import { Header } from './components/Header'
import { List } from './components/List';
import { Search } from './components/Search';
import { Notification } from './components/Notification';

export const App = () => {

  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState({});

  useEffect(() => {
    getAll().then(data => {
      setPersons(data)
    }).catch(error => {
      setMessage({ content: 'An error occurred - unable to load data please see console logs for more information', type: 'error' })
      console.log(error)
    })
  }, [])

  const [newName, setNewName] = useState({ name: '', number: '' });

  const [search, setSearch] = useState({ name: '' });

  const [filteredPersons, setFilteredPersons] = useState({});


  const handleSubmit = (event) => {
    event.preventDefault();

    const search = persons.some(person => person.name.toLowerCase() === newName.name.toLowerCase())

    if (search) {
      const toChange = persons.filter(person => person.name.toLowerCase() === newName.name.toLowerCase())
      if (window.confirm(`${newName.name} is already in the database. Do you want to change their number?`)) {
        update(toChange[0].id, newName)
          .then(
            setMessage({ content: `${newName.name} updated!`, type: 'updated' }),
            setTimeout(() => {
              setMessage({})
            }, 5000),
            getAll().then(data => {
              setPersons(data)
            })
          )
          .catch(err => {
            setMessage({ content: `An error occurred while updating ${newName.name}, please try again`, type: 'error' })
            console.log(err)
          })

      }
    } else if (!search) {
      create(newName)
        .then(data => {
          getAll().then(data => {
            setPersons(data)
          })
          setMessage({ content: `${newName.name} added!`, type: 'created' });
          setTimeout(() => {
            setMessage({})
          }, 5000);
        })
        .catch(err => {
          setMessage({ content: `An error occurred while adding ${newName.name}, please try again`, type: 'error' })
          console.log(err)
        })
    }

    setNewName({ name: '', number: '' })
  }

  const handleChange = (event) => {
    setNewName({ ...newName, [event.target.id]: event.target.value })
  }

  const handleSearch = (event) => {
    setSearch({ name: event.target.value.toLowerCase() })

    const personsArr = persons.filter(person => {
      return person.name.toLowerCase().match(new RegExp(search.name, 'g'))
    })

    setFilteredPersons(personsArr)

  }

  const handleDelete = (id) => {
    let toDelete = persons.filter((person) => person.id === id)

    if (window.confirm(`Are you sure you want to delete ${toDelete[0].name} ?`)) {
      remove(id).then(
        setMessage({ content: `${toDelete[0].name} deleted!`, type: 'delete' }),
        setTimeout(() => {
          setMessage({})
          toDelete = []
        }, 5000),
        getAll().then(data => {
          setPersons(data)
        })
      )
        .catch(err => {
          setMessage({ content: `An error occurred while deleting ${toDelete[0].name}, please try again`, type: 'error' })
          console.log(err)
        })
    }
  }


  return (
    <>
      <Header text={'Phonebook'} />

      <Notification type={message.type} message={message.content} />

      <Add newName={newName} handleSubmit={handleSubmit} handleChange={handleChange} />

      <Search handleSearch={handleSearch} filter={filteredPersons} />

      <List persons={persons} handleDelete={handleDelete} />
    </>
  )
}

export default App;
