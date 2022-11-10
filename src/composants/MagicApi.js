import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";


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
        fetch('https://api.magicthegathering.io/v1/cards')
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
    var count = 0;
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
    return <div>
        {(Array.isArray(data.cards) && data.cards.map(item => {
            if (count > 2) {
                return null;
            }
            if (item.imageUrl !== undefined) {
                count++;
                return <PlacePodium card={item} position={count} />
            }
            return null;
        }))}
    </div>
}

function SousComposant(card) {
    return (
        <div className='item' key={card.card.id}>
            <div className="card">
                <img src={card.card.imageUrl} alt="Erreur Chargement d'img"></img>
                <div className="card-body">
                    <h5 className="card-title" align="center">{card.card.name}</h5>
                </div>
            </div>
        </div>
    )
}

function PlacePodium(card, position) {
    return (
        <div className='item' key={card.card.id}>
            <div className="card">
                <img src={card.card.imageUrl} alt="Erreur Chargement d'img"></img>
                <div className="card-body">
                    <h5 className="card-title" align="center">{card.card.name}</h5>
                </div>
            </div>
        </div>
    )
}

export { ListeHome, ListePodium };