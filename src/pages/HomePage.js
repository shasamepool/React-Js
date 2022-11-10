import { ListeHome } from "../composants/MagicApi";
import { Navbar } from '../composants/Navbar.js';

function HomePage() {
    return (
        <div>
            <h1>Home</h1>
            <Navbar />
            <ListeHome />
        </div>
    )
}

export { HomePage };