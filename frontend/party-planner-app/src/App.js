import React, { useState } from 'react';
import './App.css';

function App() {
  const [partyName, setPartyName] = useState('');
  const [resultText, setResultText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/generate-activities?partyName=${partyName}`);
      const data = await response.json();

      setResultText(data.resultText);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Party Planner</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Party Name:
          <input type="text" value={partyName} onChange={(e) => setPartyName(e.target.value)} />
        </label>
        <button type="submit">Generate Activities</button>
      </form>
      {resultText && (
        <div>
          <h2>Generated Activities:</h2>
          <p>{resultText}</p>
        </div>
      )}
    </div>
  );
}

export default App;
