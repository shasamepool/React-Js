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


window.addEventListener("load", function () {
    setTimeout(codingCourse, 2000);
});

function codingCourse() {
    console.log("charger");
    document.querySelectorAll(".carte").forEach((item) => {
        item.addEventListener("mouseover", event => {
            console.log(item);
        })
    })
}


export { HomePage };