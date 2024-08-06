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
  console.log(selected)
  return (
    <div className='flex max-w-[80vw] overflow-x-scroll'>
      {
      selected.map((item, index) => (
        <div key={index} className='flex justify-between overflow-hidden bg-white rounded shadow-sm m-2 min-w-[20rem] min-h-[10rem] text-blue-500'>
          <div className='border-3 border-dashed border-red-400 flex justify-centerw-1/2'>
            <p className='text-sm m-2 text-[#af2622] font-semibold'>Ticket</p>
            <p className=' text-6xl m-auto font-thin'>{ item.toString() }</p>
          </div>

          <div className='bg-[#af2622] flex flex-col justify-center text-white w-1/2'>
            <h1 className='font-bold'>ECX</h1>
            <p className='font-thin text-sm'>Raffle Draw</p>
          </div>
        </div>
      ))
      
      }
    </div>
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

    
    // const updatedSelected = [ ...selected, randomNumber ]
    // setSelected([updatedSelected]) // This method was messing up my styles

    setSelected( prevState => [ ...prevState, randomNumber ] )

  };

  return (
    <div className='flex flex-col'>
      <h1 className='text-6xl font-semibold my-2'>Raffle Draw</h1>
    
      <div className='my-4'>
        <h2 className='text-2xl font-extralight'>Available Tickets</h2>
        <p className='font-bold'>{ availableTickets.length > 0? availableTickets.length: 'No tickets available' }</p>
        {/* <Tickets selected={availableTickets}/> */}
      </div>

      <div className='my-4 mx-auto'>
        <h2 className='text-2xl font-extralight'>Selected Tickets</h2>
        <p className='font-bold'>{ selected.length > 0? '': 'No tickets selected' }</p>
        <Tickets selected={selected}/>
      </div>
     
      <div className='my-4'>
        <h2 className='text-2xl font-extralight'>Ticket Range</h2>
        <p className='font-bold'>{min} - {max}</p>
      </div>

      <button className='bg-red-600 active:bg-red-600 my-4 w-fit mx-auto font-thin rounded px-12 py-2 hover:bg-red-800' onClick={handleGenerate}>Generate</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">

      <header className="App-header relative overflow-hidden">
        <div className='w-[7rem] h-[7rem] rounded-full bg-[#ffffff41] absolute left-[0%] top-[35%]'></div>
        <div className='w-[20rem] h-[20rem] rounded-full bg-[#fab22d70] absolute -bottom-[20%] -right-[5%]'></div>
        <div className='w-[30rem] h-[30rem] rounded-full bg-[#f2453f3b] absolute -top-[20%] -left-[20%]'></div>

        <div className='flex justify-start bg-transparent w-full h-[8rem] my-2 relative'>
          <img src="ecx3.png" alt="ecx logo"  className='w-50 m-1 absolute left-4'/>
        </div>
        <RaffleDraw/>
      </header>

      <footer>
        <p>ECX 4.0 edition</p>
      </footer>
    </div>
  );
}

export default App;