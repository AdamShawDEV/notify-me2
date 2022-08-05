import './App.css';
import Header from './components/Header';
import Notes from './components/Notes';
import { NoteFilterContextProvider } from './components/hooks/NoteFilterContext';

function App() {
  return (
    <div className="App">
      <NoteFilterContextProvider>
        <Header />
        <Notes />
      </NoteFilterContextProvider>
    </div >
  );
}

export default App;
