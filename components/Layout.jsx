import Head from "next/head";
import Header from "./Header";
import WelcomeDialog from "./WelcomeDialog";

export default function Layout({ children, user, characters }) {
    return (
        <>
            <Head>
                <title>PyGround</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
                <Header user={user} />
                <WelcomeDialog user={user} characters={characters} />
                {children}
            </div>
        </>
    )
}