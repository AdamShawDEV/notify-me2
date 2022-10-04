import { useEffect, useState } from "react"

const initailNotesData = [
    {
        id: 'lenfk3l3n4jn3',
        title: "Welcome🤩",
        contents: "This is an example site created for demomostration proposes. ",
        alignment: 'center',
    },
    {
        id: 'fldshkdjsan4234',
        title: "⚙️Features⚙️",
        contents: "Key features:\n✨ React.js\n✨ Standard CSS\n✨ Local Storage\n✨ CRUD operations\n✨ Search filter\n✨ Progress indicators",
        alignment: 'left',
    },
    {
        id: 'lenfk3l3ern4jn3',
        title: "About",
        contents: "This site was created using react and standard CSS",
        alignment: 'right',
    },
]

const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
}

function useRequestData() {
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState(null);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        async function getData() {
            try {
                await delay(2000);
                const notesData = JSON.parse(localStorage.getItem("notesData")) ?? initailNotesData;
                setData(notesData);
                setRequestStatus(REQUEST_STATUS.SUCCESS);
            } catch(e) {
                setError(e);
                setRequestStatus(REQUEST_STATUS.ERROR);
            }
        }

        getData();
    }, []);

    async function addRecord(rec, doneCallBack = null) {
        let newData = [...data, rec];

        try {
            await delay(2000);
            localStorage.setItem('notesData', JSON.stringify(newData));
            setData(newData);
            if (doneCallBack) doneCallBack();
        } catch (error) {
            setError(error);
            setRequestStatus(REQUEST_STATUS.ERROR);
        }
    }

    async function deleteRecord(id, doneCallBack = null) {
        let newData = data.filter((item) => item.id !== id);

        try {
            await delay(2000);
            localStorage.setItem('notesData', JSON.stringify(newData));
            setData(newData);
            if (doneCallBack) doneCallBack();
        } catch (error) {
            setError(error);
            setRequestStatus(REQUEST_STATUS.ERROR);
        }
    }

    async function updateRecord(rec, doneCallBack = null) {
        let newData = data.map(item => (item.id === rec.id ? rec : item));

        try {
            await delay(2000);
            localStorage.setItem('notesData', JSON.stringify(newData));
            setData(newData);
            if (doneCallBack) doneCallBack();
        } catch (error) {
            setError(error);
            setRequestStatus(REQUEST_STATUS.ERROR);
        }
    }

    return { data, requestStatus, error, addRecord, deleteRecord, updateRecord };
}

export { useRequestData, REQUEST_STATUS };