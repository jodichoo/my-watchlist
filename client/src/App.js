import './App.css';
import Navbar from './components/Navbar';
import NavItem from './components/NavItem';
import ShowList from './components/ShowList';
import Watchlist from './components/Watchlist'; 

function App() {
  return (
    <div className="App">
      <Navbar />
      <ShowList /> 
    </div>
  );
}

export default App;
