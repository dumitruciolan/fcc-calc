import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
// import './App.scss';
import CalcV1 from './components/CalcV1'
import CalcV11 from './components/CalcV11'

function App() {
  const [version, setVersion] = useState('v1');
  
  return (
    <div>
      <button onClick={() => setVersion('v1')}>calc v1</button>
      <button onClick={() => setVersion('v1.1')}>calc v1.1</button>

      { version === 'v1' ? (
        <CalcV1 />
      ):(
        <CalcV11 />
      ) }
    </div>
  );
}

export default App;
