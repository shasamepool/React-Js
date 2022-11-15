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
    useEffect(() => {
        fetch('https://api.magicthegathering.io/v1/cards?types=Creature|Sorcery|Artifact')
            .then(json => json.json())
            .then(donnee => { setData((data) => data = donnee); })
            .catch(error => {
                console.log(error);
            });
    }, [])
    useEffect(() => {
        //console.log(data);
    }, [data])
    return <div className='grid-container'>
        {(Array.isArray(data.cards) && data.cards.map(item => {
            if (item.imageUrl !== undefined) {
                return <SousComposant card={item} />
            }
            return null;
        }))}
    </div>
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
    if (espece === undefined) {
        espece = "Inconnu";
    }
    if (histoire === undefined) {
        histoire = "Ce personnage est très mystérieux personne ne connait ses origines"
    }
    return (
        <div className='parentCarte'>
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