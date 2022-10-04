import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Notes from './components/Notes';
import { NoteFilterContextProvider } from './components/hooks/NoteFilterContext';
import { APP_STATE } from './consts';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Reset from './components/Reset';

const mainComponents = {
  [APP_STATE.DEMO]: <Notes />,
}

function App() {
  const [appState, setAppState] = useState(APP_STATE.DEMO);

  return (
    <div className="App">
      <NoteFilterContextProvider>
        <Header setAppState={setAppState} />
        <main>
          <Routes>
            <Route path='/' element={mainComponents[appState]} />
            <Route path='/register' element={<Register />} />
            <Route path='/reset' element={<Reset />} />
          </Routes>
        </main>
      </NoteFilterContextProvider>
    </div >
  );
}

export default App;
