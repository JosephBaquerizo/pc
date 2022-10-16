import { useState, useEffect, useRef } from "react";
import Card from "../card/card";
import Spinner from "../spinner/spinner";
import styles from "./cardsContainer.module.css";


export default function CardsContainer() {

    const [loading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [pokemonGroup, setPokemonGroup] = useState(1);

    const handleScroll = (e) => {
        e.preventDefault();
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        const reachedBottom = scrollHeight - scrollTop === clientHeight;
        if (reachedBottom) {
            setPokemonGroup(current => current + 24);
        }
    }

    useEffect(() => {
        const getPokemons = async () => {
            setLoading(true);
            try {
                if (pokemons.length < 800) {
                    for (let i=pokemonGroup; i < pokemonGroup + 24; i++) {
                        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
                        const pokemonJSON = await pokemon.json();
                        setPokemons(current => [...current, pokemonJSON]);
                    }
                }
            } catch(error) {
                console.log(error);
            }
        }
        getPokemons();
        setLoading(false);

    }, [pokemonGroup]);

    return (
        <>
            <div onScroll={handleScroll} className={styles.cardsContainer}>
                {
                    pokemons.length
                    ?
                    pokemons.map((item, index) => {
                        return <Card key={index} pokemonInfo={item} />
                    })
                    :
                    <span>No Pokemons</span>
                }
            </div>
            {
                loading
                ?
                <Spinner />
                :
                <></>
            }
        </>
    )
}