
import './App.css';

function starWarsApp() {
  
  
  
  return (
    <div className="App">
      <div className="container text-center">
      <form>
        <input type="text"/>
        <button type="submit">
          Search
        </button>
      </form>
          
          <table className="table table-bordered table-hover">
            <thead>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Homeworld</th>
              <th>Species</th>
            </thead>
            {/* <tbody>
          {characters.map((character) => (
            <tr>
              <td>{character.date}</td>
              <td>{character.location}</td>
              <td>{character.description}</td>
              <td>{character.amount}</td>
            </tr>
          ))}
        </tbody> */}
          </table>
          </div>      
    </div> 
  );
}

export default starWarsApp;
