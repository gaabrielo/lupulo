import { useState } from 'react';
import { Dash } from './pages/Dash';
import { NewAnalysis } from './pages/NewAnalysis';

function App() {
  const [newAnalysis, setNewAnalysis] = useState(false);

  return (
    <div className="App">
      {newAnalysis ? (
        <NewAnalysis handleGoBack={() => setNewAnalysis(false)} />
      ) : (
        <Dash handleNewAnalysis={() => setNewAnalysis(true)} />
      )}
    </div>
  );
}

export default App;
