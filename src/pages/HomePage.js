import { ListeHome } from "../composants/MagicApi";
import { Navbar } from '../composants/Navbar.js';

function HomePage() {
    return (
        <div>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </head>
            <h1>Home</h1>
            <Navbar />
            <ListeHome />
        </div>
    )
}

export { HomePage };