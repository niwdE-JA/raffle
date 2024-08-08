import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function range(start, end) {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}

function Tickets({selected}) {
  return (
    <ul>
      {selected.map((item, index) => (
        <li key={index}>{item.toString()}</li>
      ))}
    </ul>
  );
}


function RaffleDraw() {
  const [min, setMin] = useState()
  const [max, setMax] = useState()
  const [availableTickets, setAvailableTickets] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(()=>{
    const min = Number(getParameterByName('min')) ?? 1;
    const max = Number(getParameterByName('max'))?? 100;

    setMin(min)
    setMax(max)
    setAvailableTickets(range(min, max))
  }, [])

  const handleGenerate = () => {
    const randomIndex = Math.floor(Math.random() * availableTickets.length)
    const randomNumber = availableTickets[randomIndex]
    console.log(min)
    console.log(max)
    console.log(randomNumber)
    // do whatever jara

    // update array
    const updatedAvailable = [...availableTickets]
    setAvailableTickets(updatedAvailable.filter(item => item != randomNumber))

    
    const updatedSelected = [ ...selected, randomNumber ]
    setSelected([updatedSelected])

  };

  return (
    <div>
      <h1>Raffle Draw</h1>
      <div>
        <h2>Available Tickets:</h2>
        <p>{ availableTickets.length > 0? availableTickets.length: 'No tickets available' }</p>
        {/* <Tickets selected={availableTickets}/> */}
      </div>
      <div>
        <h2>Selected Tickets:</h2>
        <p>{ selected.length > 0? '': 'No tickets selected' }</p>
        <Tickets selected={selected}/>
      </div>

      
      <div>
        <h2>Ticket Range:</h2>
        <p>{min} to {max}</p>
      </div>
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RaffleDraw/>
      </header>
      <footer>
        <p>ECX 4.0 edition</p>
      </footer>
    </div>
  );
}

export default App;