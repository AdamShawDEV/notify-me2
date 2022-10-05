import { useEffect, useState } from "react"

const initailNotesData = [
    {
        id: 'lenfk3l3n4jn3',
        title: "Welcome🤩",
        contents: "This is an example site created for demomostration proposes only. ",
        alignment: 'center',
    },
    {
        id: 'fldshkdjsan4234',
        title: "⚙️Features⚙️",
        contents: "Key features:\n✨ React.js\n✨ Standard CSS\n✨ Local Storage\n✨ CRUD operations\n✨ Firebase auth\n✨ Firestore\n✨ Search filter\n✨ Progress indicators",
        alignment: 'left',
    },
    {
        id: 'lenfk3l3ern4jn3',
        title: "About",
        contents: "These are the demo notes.\nFeel free to add and delete notes here.\nRefresh page to reset.\nOr login to store your own notes",
        alignment: 'right',
    },
    {
        id: 'dsf90s9f9s-9dfs',
        title: "Created by😎",
        contents: "Adam Shaw\n\n✔️website: adamshaw.dev\n✔️github: github.com/AdamShawDEV",
        alignment: 'left',
    },
]

function useRequestData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        async function getData() {
            try {
                await delay(2000);
                // const notesData = JSON.parse(localStorage.getItem("notesData")) ?? initailNotesData;
                // setData(notesData);
                setData(initailNotesData);
            } catch(e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    async function addRecord(rec, doneCallBack = null) {
        let newData = [...data, rec];

        try {
            await delay(2000);
            // localStorage.setItem('notesData', JSON.stringify(newData));
            setData(newData);
            if (doneCallBack) doneCallBack();
        } catch (error) {
            setError(error);
        }
    }

    async function deleteRecord(id, doneCallBack = null) {
        let newData = data.filter((item) => item.id !== id);

        try {
            await delay(2000);
            // localStorage.setItem('notesData', JSON.stringify(newData));
            setData(newData);
            if (doneCallBack) doneCallBack();
        } catch (error) {
            setError(error);
        }
    }

    async function updateRecord(rec, doneCallBack = null) {
        let newData = data.map(item => (item.id === rec.id ? rec : item));

        try {
            await delay(2000);
            // localStorage.setItem('notesData', JSON.stringify(newData));
            setData(newData);
            if (doneCallBack) doneCallBack();
        } catch (error) {
            setError(error);
        }
    }

    return { data, loading, error, addRecord, deleteRecord, updateRecord };
}

export { useRequestData };