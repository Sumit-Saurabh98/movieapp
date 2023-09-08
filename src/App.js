import './App.css';
import Navbar from './pages/Navbar';
import PublicRoute from './routes/PublicRoute';

function App() {
  return (
    <div className="App">
      <div className="content">
        <PublicRoute />
      </div>
      <div className="navbar">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
