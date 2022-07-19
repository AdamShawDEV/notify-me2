import { createContext, useState } from "react"

const NoteFilterContext = createContext();

function NoteFilterContextProvider({ children }) {
    const [noteFilter, setNoteFilter] = useState('');

    return (
        <NoteFilterContext.Provider value={{noteFilter, setNoteFilter}}>
            {children}
        </NoteFilterContext.Provider>
    )
}

export { NoteFilterContext, NoteFilterContextProvider  };