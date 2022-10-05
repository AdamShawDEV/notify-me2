import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import { DemoNotes, UserNotes } from './components/Notes';
import { NoteFilterContextProvider } from './components/hooks/NoteFilterContext';
import Register from './components/Register';
import Reset from './components/Reset';
import { MODAL_OPEN } from './consts';
import LoginForm from './components/LoginForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Toast from './components/Toast';

function App() {
  const [modalOpen, setModalOpen] = useState(MODAL_OPEN.NONE);
  const [user] = useAuthState(auth);
  const [toast, setToast] = useState({ display: false, message: '' });

  return (
    <>
      <div className="App">
        <NoteFilterContextProvider>
          <Header setModalOpen={setModalOpen} />
          <main>
            {!user ? <DemoNotes /> : <UserNotes />}
          </main>
        </NoteFilterContextProvider>
      </div >
      {modalOpen === MODAL_OPEN.LOGIN && <LoginForm modalOpen={modalOpen} setModalOpen={setModalOpen} setToast={setToast} />}
      {modalOpen === MODAL_OPEN.RESET && <Reset modalOpen={modalOpen} setModalOpen={setModalOpen} setToast={setToast} />}
      {modalOpen === MODAL_OPEN.REGISTER && <Register modalOpen={modalOpen} setModalOpen={setModalOpen} setToast={setToast} />}
      {toast.display && <Toast toast={toast} setToast={setToast} />}
    </>
  );
}

export default App;
