import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import Fuse from 'fuse.js';

var count = 0;

function ListeHome() {
    return (
        <ComposantListe />
    )
}

function ListePodium() {
    return (
        <TopTroisListe />
    )
}

function ComposantListe() {
    const [cards, setCards] = useState([]);
    const [select, setSelect] = useState("aucun");
    const [query, setQuery] = useState("");
    const fuse = new Fuse(cards, {
        keys: [
            'name'
        ],
        includeScore: true
    })
    var Creature = "btn btn-secondary"
    var Sorcery = "btn btn-secondary"
    var Artifact = "btn btn-secondary"
    var paramRequete = "Creature|Sorcery|Artifact"
    switch (select) {
        case "Creature":
            Creature = "btn btn-primary"
            paramRequete = "Creature"
            break;
        case "Sorcery":
            Sorcery = "btn btn-primary"
            paramRequete = "Sorcery"
            break;
        case "Artifact":
            Artifact = "btn btn-primary"
            paramRequete = "Artifact"
            break;
        default:
            //console.log("Error Order");
            break;
    }



    useEffect(() => {
        fetch(`https://api.magicthegathering.io/v1/cards?types=${paramRequete}`)
            .then(json => json.json())
            .then(donnee => { setCards(donnee.cards); })
            .catch(error => {
                console.log(error);
            });
    }, [paramRequete])

    const searchResult = query ? doSearch() : cards;

    return <div className='grey'>
        <button className={Creature} onClick={() => { setSelect("Creature") }}>Creature</button >
        <button className={Sorcery} onClick={() => { setSelect("Sorcery") }}>Sorcery</button>
        <button className={Artifact} onClick={() => { setSelect("Artifact") }}>Artifact</button>

        <div className="searchBox">
            <input className="searchInput" type="text" name="" placeholder="Search" value={query} onChange={handleOnChange} />
            <button className="searchButton" href="#">
                <i className="material-icons">
                    search
                </i>
            </button>
        </div>
        <button className="btn btn-dark btnOrder" onClick={() => { orderOnClick() }}>Order</button >

        <div className='grid-container'>
            {(Array.isArray(searchResult) && searchResult.map((item, i) => {
                if (item.imageUrl !== undefined) {
                    return <div key={i} > <SousComposant card={item} /></div>
                }
                return null;
            }))}
        </div>
    </div >


    function orderOnClick() {
        var cardsTemp = [...cards.sort((c1, c2) => {/*-1 -> c1 avant c2, 1 -> c2 avant c1*/
            if (c1.rarity === "Rare") {
                if (c2.rarity === "Rare")
                    return 0
                return -1
            }
            if (c1.rarity === "Uncommon") {
                if (c2.rarity === "Rare")
                    return 1
                if (c2.rarity === "Uncommon")
                    return 0
                return -1
            }
            if (c1.rarity === "Common") {
                if (c2.rarity === "Common")
                    return 0
                return 1
            }
            console.log(`Error orderOnClick, ${c1.rarity} : ${c2.rarity}`);
            return 1
        })]
        setCards(cardsTemp);
    }

    function handleOnChange({ currentTarget = {} }) {
        const value = currentTarget.value;
        setQuery(value);
    }

    function doSearch() {
        fuse.search(query).map(result => console.log(result.score));
        return fuse.search(query).map(result => result.score < 0.4 ? result.item : []);
    }
}

function TopTroisListe() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://api.magicthegathering.io/v1/cards?supertypes=Legendary&types=Creature')
            .then(json => json.json())
            .then(donnee => { setData((data) => data = donnee); })
            .catch(error => {
                console.log(error);
            });
    }, [])
    useEffect(() => {
        //console.log(data);
    }, [data])
    return <div className='conteneurPodium'>
        {(Array.isArray(data.cards) && data.cards.map(item => {
            if (count > 2) {
                return null;
            }
            if (item.imageUrl !== undefined) {
                count++;
                return <PlacePodium card={item} />
            }
            return null;
        }))}
    </div>
}

function SousComposant(card) {
    const [showImg, setShowImg] = useState(false);
    const classCarte = `carte ${card.card.types[0]}`;
    var espece = card.card.subtypes;
    var histoire = card.card.flavor;
    var borderRarity = ""
    if (espece === undefined) {
        espece = "Inconnu";
    }
    if (histoire === undefined) {
        histoire = "Ce personnage est très mystérieux personne ne connait ses origines"
    }
    switch (card.card.rarity) {
        case "Common":
            borderRarity = "parentCarte commun";
            break;
        case "Uncommon":
            borderRarity = "parentCarte uncommon";
            break;
        case "Rare":
            borderRarity = "parentCarte rare";
            break;
        case "Mythic Rare":
            borderRarity = "parentCarte mythicRare";
            break;
        case "Special":
            borderRarity = "parentCarte special";
            break;
        case "Basic Land":
            borderRarity = "parentCarte basicLand";
            break;
        default:
            borderRarity = "parentCarte";
            //console.log("Error bordure color");
            break;
    }


    return (
        <div className={borderRarity}>
            {!showImg && (
                <div className={classCarte} onMouseEnter={() => setShowImg(true)}>
                    <div className='inside'>
                        <h3 className="titleCard">{card.card.name}</h3>
                    </div>
                    <p className='info'><b>Espèce : </b>{espece}</p>
                    <p className='info'><b>Rareté : </b>{card.card.rarity}</p>
                    <p className='info'><b>Coût : </b>{card.card.cmc}</p>
                    <p className='description'><b>Description : </b>{histoire}</p>
                </div >
            )}
            {showImg && (
                <div className='carteImage' onMouseLeave={() => setShowImg(false)}>
                    <img src={card.card.imageUrl} alt="Erreur Chargement d'img"></img>
                </div>
            )}
        </div >

    )
}

function PlacePodium(card) {
    return (
        <div className="item" key={card.card.id}>
            <div className="card carte text-bg-warning">
                <img src={card.card.imageUrl} alt="Erreur Chargement d'img"></img>
                <div className="card-body">
                    <h5 className="card-title" align="center">{card.card.name}</h5>
                </div>
            </div>
        </div>
    )
}

export { ListeHome, ListePodium };