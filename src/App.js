import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Notes from './components/Notes';
import { useRequestData, REQUEST_STATUS } from './components/hooks/useRequestData'

function App() {
  const { data } = useRequestData();

  return (
    <div className="App">
      <Header />
      <Notes notes={data} />
    </div>
  );
}

export default App;
