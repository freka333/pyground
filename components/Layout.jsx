import Header from "./Header";
import WelcomeDialog from "./WelcomeDialog";

export default function Layout({ children, user, characters }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }} >
            <Header user={user} />
            <WelcomeDialog user={user} characters={characters} />
            {children}
        </div>
    )
}