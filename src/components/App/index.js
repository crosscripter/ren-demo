import Search from '../Search'
import './styles.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <h2>Find a Charity</h2>
        <h3>Looking for a place to donate but don't know where to start? We can help!</h3>
      </header>
      <Search />
    </div>
  );
}

export default App;
