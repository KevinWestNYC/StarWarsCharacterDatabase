import React, { useState, useEffect }  from 'react';
// import CharacterList from './CharacterList';
import Pagination from './Pagination';
import Search from './Search';
import axios from 'axios';

function StarWarsApp() {
  const [characters, setCharacters] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://swapi.dev/api/people/")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {
      setLoading(false)
      setNextPageUrl(response.data.next)
      setPrevPageUrl(response.data.previous)
      setCharacters(response.data.results)
  })

    return () => cancel()
    }, [currentPageUrl])

    useEffect(() => {
      const fetchItems = async () => {
        const result = await axios(`https://swapi.dev/api/people/?search=${query}`)

        setCharacters(result.data)
        setLoading(false)
      }

      fetchItems()
    }, [query])

    function goToNextPage() {
      setCurrentPageUrl(nextPageUrl)
    }

    function goToPrevPage() {
      setCurrentPageUrl(prevPageUrl)
    }
  
  
  if(loading) return "Loading..."

  return (
    <div className="App">
      <h1>Star Wars Character Search</h1>
      <div className="container text-center">
      {/* <form> */}
        <Search getQuery={(query) => setQuery(query)} />
        {/* <input type="text"/>
        <button type="submit">
          Search
        </button> */}
      {/* <CharacterList characters={characters} /> */}
      {/* </form> */}
          <table className="table table-bordered table-hover">
            <thead>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Homeworld</th>
              <th>Species</th>
            </thead>
            <tbody>
          {characters.map((character) => (
            <tr>
              <td>{character.name}</td>
              <td>{character.birth_year}</td>
              <td>{character.height}</td>
              <td>{character.mass}</td>
              <td>{character.homeworld}</td>
              <td>{character.species}</td>
            </tr>
          ))}
        </tbody>
          </table>
          <Pagination 
            goToNextPage={nextPageUrl ? goToNextPage : null}
            goToPrevPage={prevPageUrl ? goToPrevPage : null}
          />
          </div>      
    </div> 
  );
}

export default StarWarsApp;
