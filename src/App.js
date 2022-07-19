import './App.css';
import { createContext, useState } from 'react';
import Header from './components/Header';
import Notes from './components/Notes';
import { useRequestData, REQUEST_STATUS } from './components/hooks/useRequestData'
import { NoteFilterContextProvider } from './components/hooks/NoteFilterContext';

function App() {
  const { data } = useRequestData();
  const [noteFilter, setNoteFilter] = useState();

  return (
    <div className="App">
      <NoteFilterContextProvider>
        <Header />
        <Notes notes={data} />
      </NoteFilterContextProvider>
    </div >
  );
}

export default App;
