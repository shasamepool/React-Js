import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";

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
    const [data, setData] = useState([]);
    const [select, setSelect] = useState("aucun");
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
            .then(donnee => { setData((data) => data = donnee); })
            .catch(error => {
                console.log(error);
            });
    }, [paramRequete])
    useEffect(() => {
        //console.log(data);
    }, [data])
    return <div className='grey'>
        <button class={Creature} onClick={() => { setSelect("Creature") }}>Creature</button >
        <button class={Sorcery} onClick={() => { setSelect("Sorcery") }}>Sorcery</button>
        <button class={Artifact} onClick={() => { setSelect("Artifact") }}>Artifact</button>


        <div className='grid-container'>
            {(Array.isArray(data.cards) && data.cards.map(item => {
                if (item.imageUrl !== undefined) {
                    return <SousComposant card={item} />
                }
                return null;
            }))}
        </div>
    </div >
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