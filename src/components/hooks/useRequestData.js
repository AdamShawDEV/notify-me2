import { useEffect, useState } from "react"

const notesData = [
    {
        id: 'lenfk3l3n4jn3',
        title: "First Note",
        contents: "This the the contents of the first note.",
    },
    {
        id: 'fldshkdjsan4234',
        title: "Second Note",
        contents: "This is the contents of the second note.",
    },
    {
        id: 'lenfk3l3ern4jn3',
        title: "First Note",
        contents: "This the the contents of the first note.",
    },
    {
        id: 'fqreldshwrkdjsan4234',
        title: "Second Note",
        contents: "This is the contents of the second note.",
    },
    {
        id: 'lenfk3lre3n4jn3',
        title: "First Note",
        contents: "This the the contents of the first note.",
    },
    {
        id: 'fldshkdjsanqer4234',
        title: "Second Noqte",
        contents: "This is the contents of the second note.",
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

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        async function getData() {
            await delay(2000);
            setData(notesData);
            setRequestStatus(REQUEST_STATUS.SUCCESS);
        }

        getData();
    }, []);

    console.log(data);

    function addRecord(rec) {
        let newData = [...data, rec];
        setData(newData);
    }

    function deleteRecord(id) {
        let newData = data.filter((item) => item.id !== id );

        setData(newData);
    }

    function updateRecord(rec) {
        let newData = data.map(item => (item.id === rec.id ? rec : item));

        setData(newData);
    }

    return { data, requestStatus, addRecord, deleteRecord, updateRecord };
}

export { useRequestData, REQUEST_STATUS };