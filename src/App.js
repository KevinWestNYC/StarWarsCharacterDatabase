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
    const getCharacterData = async () => {
      await axios.get(currentPageUrl).then(async response => {
        setLoading(false)
        const characterData = response.data.results
        
        for(const character of characterData){
          const homeworld = character.homeworld;
          const homeworldResponse = await axios.get(homeworld)
          character.homeworld = homeworldResponse.data.name;
          
          const species = character.species;
          const speciesResponse = await axios.get(species)
          character.species = speciesResponse.data.name
          
        }
  
        setCharacters(characterData)        
    });
  };  
      getCharacterData();
    }, [currentPageUrl])

    console.log("characters: ", characters)

    
    //search
    useEffect(() => {
      setLoading(true)
      const fetchCharacters = async () => {
      const result = await axios(`https://swapi.dev/api/people/?search=${query}`)
        setLoading(false)
        setCharacters(result.data)        
      }
      fetchCharacters()
    }, [])

    
    //Pagination
    useEffect(() => {
      setLoading(true)
      const getCharacterData = async () => {
        await axios.get(currentPageUrl).then(async response => {
          setLoading(false)
          const characterData = response.data.results
          
        setNextPageUrl(response.data.next)
        setPrevPageUrl(response.data.previous)
          
          setCharacters(characterData)
          
        });
      };      
          getCharacterData();
        }, [currentPageUrl])

    function goToNextPage() {
      setCurrentPageUrl(nextPageUrl)
    }

    function goToPrevPage() {
      setCurrentPageUrl(prevPageUrl)
    }
  
    if(loading) return <h1 className="text-center">Loading...</h1>

    return (
      <div className="App">
        <h1 className="text-center">Star Wars Character Search</h1>
        <div className="container text-center">
          <Search getQuery={(query) => setQuery(query)} />
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
            : null}
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
  