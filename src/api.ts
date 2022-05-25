import { app } from "./firebase-config";
const db = app.database();


export const getDbData = (dataRef:string) => {
    var array;
    const dbRef = db.ref(dataRef);
    let result;

    dbRef.on("value", (snapshot: any) => {
        const snapshotValue = snapshot.val();
        const outputArray = [];

        for (let id in snapshotValue) {
            outputArray.push({ id, ...snapshotValue[id] });
        }

        array = outputArray;

        result = array[array.length - 1];
    });

    return result;
}