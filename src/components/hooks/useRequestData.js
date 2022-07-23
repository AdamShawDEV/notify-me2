import { useEffect, useState } from "react"

const notesData = [
    {
        id: 'lenfk3l3n4jn3',
        title: "Welcome",
        contents: "This is an example site.",
    },
    {
        id: 'fldshkdjsan4234',
        title: "Second Note",
        contents: "Feel free to test out some of the sites features.",
    },
    {
        id: 'lenfk3l3ern4jn3',
        title: "About",
        contents: "This site was created using react and standard CSS",
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

    async function addRecord(rec, doneCallBack = null) {
        let newData = [...data, rec];

        try {
            await delay(2000);
            setData(newData);
            if(doneCallBack) doneCallBack();
        } catch (error) {
            console.log(`error adding record ${rec}, ${error}`);
        }
    }

    async function deleteRecord(id, doneCallBack = null) {
        let newData = data.filter((item) => item.id !== id);

        try {
            await delay(2000);
            setData(newData);
            if (doneCallBack) doneCallBack();
        } catch (error) {
            console.log(`error deletin record with id:${id}, ${error}`);
        }
    }

    async function updateRecord(rec, doneCallBack = null) {
        let newData = data.map(item => (item.id === rec.id ? rec : item));

        try {
            await delay(2000);
            setData(newData);
            if (doneCallBack) doneCallBack();
        } catch (error) {
            console.log(`An Error occurred while updating record ${rec}, ${error}`);
        }
    }

    return { data, requestStatus, addRecord, deleteRecord, updateRecord };
}

export { useRequestData, REQUEST_STATUS };