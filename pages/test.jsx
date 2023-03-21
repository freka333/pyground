import { getSession } from 'next-auth/react';
import dbConnect from '../lib/mongoose'
import Test from '../models/test'

export default function TestComp({ session, users }) {
    return (
        <>
            {users.map((user) => (
                <div key={user._id}>
                    <h5 className="pet-name">{user.name}</h5>
                    <div className="main-content">
                        <p className="age">Age: {user.age}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return { redirect: { destination: '/', permanent: false } }
    }

    await dbConnect()

    /* find all the data in our database */
    const result = await Test.find({})

    //const user = await Test.create({ name: "Gabi", age: 34 });

    const users = result.map((doc) => {
        const user = doc.toObject()
        user._id = user._id.toString()
        console.log(user.name)
        return user
    })
    console.log(typeof users)
    return { props: { session, users: users } }

    /* TEST:
    const database = (await clientPromise).db();
    const users = database.collection("users");
    const frekaUsers = await (await users.find({ email: "freka333@gmail.com" }).toArray()).map(e => { return { ...e, _id: e._id.toString() } })
    const a = await users.find({ email: "freka333@gmail.com" }).toArray()
    JSON.stringify(a)
    return {
        props: { test: "asd", user: JSON.parse(JSON.stringify(a)) },
    }*/

    /*all mission:
    const missions = await database.collection("missions").find({}).toArray();
    return {
        props: { mission: JSON.parse(JSON.stringify(missions)) }
    }*/

    //const missions = await database.collection("missions").find({}).toArray();
    //const userResult = await User.find({ _id: session.userId});
}