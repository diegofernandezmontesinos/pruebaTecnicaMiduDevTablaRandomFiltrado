import { useEffect, useRef, useState } from 'react'
import { type User } from "./types"
import UsersList from "./components/UsersList.jsx"
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  //const [originalUsers, setOriginalUsers] = useState<User[]>([])
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  
  console.log(sortByCountry) 
  
  
  const filteredUsers = typeof filterCountry === 'string' && filterCountry.length > 0
  ? users.filter(user => {
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })
  : users 


  
  const sortedUsers = sortByCountry
   //  ? [...users].toSorted((a,b) => { 
   ? users.toSorted((a,b) => { //metodo de ES8
    return a.location.country.localeCompare(b.location.country)
    })
    : filteredUsers



  const toggleColors =() => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry =() => {
    setSortByCountry(prevState => !prevState)
    
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email != email )
    setUsers(filteredUsers)
    
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }
  


  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
    .then(async res => await res.json())
    .then (res => {
        setUsers(res.results)
        //setOriginalUsers(res.results)
        originalUsers.current = res.result
    })
    .catch(err => {
      console.log(err)
    })
  }, [])




  return (
    <div className='App'>
        <h1> DFM </h1>
        <header>
          <button onClick={toggleColors}>
            Colorear filas
          </button>

          <button onClick={ toggleSortByCountry}>
           { sortByCountry ? 'No ordenar por país' : 'Ordenar por pais' }
          </button>

          <button onClick={ handleReset}>
           Resetear estado
          </button>

          <input placeholder='filtrar por país' onChange={(e) => {
            setFilterCountry(e.target.value)
          }} >
          
          </input>


        </header>
        <main>
          <UsersList showColors={showColors} users={sortedUsers} deleteUser={handleDelete} />

        </main>
    </div>
  )
}

export default App
