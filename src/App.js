import React, { useState, useEffect }  from 'react';
import Pagination from './Pagination';
import Search from './Search';
import axios from 'axios';
import './style.css'

function StarWarsApp() {
  const [characters, setCharacters] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://swapi.dev/api/people/")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {       
    getCharacterData();
    }, [currentPageUrl])

    
    const getCharacterData = async () => {
        setLoading(true) 
        const response = await axios.get(currentPageUrl)
        const characterData = response.data.results
        setNextPageUrl(response.data.next)
        setPrevPageUrl(response.data.previous)
        
        for(const character of characterData){
          const homeworld = character.homeworld;
          const homeworldResponse = await axios.get(homeworld)
          character.homeworld = homeworldResponse.data.name;
          
          const species = character.species;
          const speciesResponse = await axios.get(species)
          character.species = speciesResponse.data.name
        }
        setCharacters(characterData)
        setLoading(false)
    };

    function handleSearch(e, query){
      e.preventDefault();
      setCurrentPageUrl(`https://swapi.dev/api/people/?search=${query}`)
    }

    function goToNextPage() {
      setCurrentPageUrl(nextPageUrl)
    }

    function goToPrevPage() {
      setCurrentPageUrl(prevPageUrl)
    }

    function goToFirstPage() {
      setCurrentPageUrl("https://swapi.dev/api/people/")
    }


    return (
      <div className="App">
        <h1 className="text-center">Star Wars Character Search</h1>
        <div className="container text-center">
          <Search handleSearch={handleSearch} />
          <table className="table table-bordered table-hover">
              <thead>
                <th>Name</th>
                <th>Birth Date</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Homeworld</th>
                <th>Species</th>
              </thead>
              
              {loading ? <h1 className="text-center">Loading...</h1> : 
              <tbody>
            {characters.length > 0 ?
            characters.map((character) => (
              <tr key={character.name} >
                <td>{character.name}</td>
                <td>{character.birth_year}</td>
                <td>{character.height}</td>
                <td>{character.mass}</td>
                <td>{character.homeworld}</td>
                <td>{character.species || "Humanoid"}</td>
              </tr>
            ))
            : null }
          </tbody>}
            </table>
            <Pagination 
              goToNextPage={nextPageUrl ? goToNextPage : null}
              goToPrevPage={prevPageUrl ? goToPrevPage : null}
              goToFirstPage={characters.length < 10 ? goToFirstPage : null}
            />
            </div>      
      </div> 
    );
  }
  
  export default StarWarsApp;
  