import './App.css';
import PlayerDashboard from './PlayerDashboard.jsx';
import PlayerContextProvider from './playerContextProvider.js';

function App() {
  return (
    <PlayerContextProvider>
      <PlayerDashboard />
    </PlayerContextProvider>
  );
}

export default App;
