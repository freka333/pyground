import Layout from "@/components/Layout";
import { Typography } from "@mui/material";
import ContainerBox from "./ContainerBox";

export default function TaskNotFound({ user, characters }) {

    return (
        <Layout user={user} characters={characters}>
            <ContainerBox justifyContent='center' alignItems='center'>
                <Typography variant='h5'>A feladat nem található, vagy számodra még nem elérhető.</Typography>
            </ContainerBox>
        </Layout>
    )
}