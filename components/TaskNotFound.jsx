import Layout from "@/components/Layout";
import { Button, Typography } from "@mui/material";

export default function TaskNotFound({ user, characters }) {
    console.log("name", user.nickname)
    return (
        <Layout user={user} characters={characters}>
            <div className="mainPage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }} >
                <Typography variant="h5">A feladat nem található, vagy számodra még nem elérhető.</Typography>
            </div>
        </Layout>
    )
}