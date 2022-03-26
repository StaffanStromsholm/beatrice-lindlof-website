import { app } from "./firebase-config";
const db = app.database();


export const getDbData = async (dbRef: string) => {
    var postArray;
    const postRef = await db.ref(dbRef);

    return postRef.on("value", async (snapshot) => {
        const posts = await snapshot.val();
        const postList = [];

        for (let id in posts) {
            postList.push({ id, ...posts[id] });
        }

        postArray = postList;

        console.log(postArray[postArray.length - 1]);

        return postArray[postArray.length - 1];
    });
}