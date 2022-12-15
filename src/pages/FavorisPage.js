import { MesFavoris } from "../composants/MagicApi";
import { Navbar } from '../composants/Navbar.js';

export function FavorisPage() {
    return (
        <div>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </head>
            <h1>Home</h1>
            <Navbar />
            <MesFavoris />
        </div>
    )
}