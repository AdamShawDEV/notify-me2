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
    }
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

    return { data, requestStatus, addRecord };
}

export { useRequestData, REQUEST_STATUS };