import { useState } from "react";
import CardModal from "../cardModal/cardModal";
import ColorType from "../../utils/colorType";
import Image from "next/image";
import styles from "./card.module.css";


export default function Card ({ pokemonInfo }) {

    const [showModal, setShowModal] = useState(false);

    const id = pokemonInfo.id;
    const name = pokemonInfo.name;
    //const image = pokemonInfo.sprites.front_default; //front_default sometimes uses GET with parameters that disable image loading
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    const type = pokemonInfo.types[0].type.name;
    const colorType = ColorType[type] ? ColorType[type] : "black";

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            {
                showModal
                &&
                <CardModal 
                    closeModal={() => setShowModal(false)} 
                    modalState={showModal}
                    image={image}
                    pokemonInfo={pokemonInfo}
                    name={capitalizeFirstLetter(name)}
                />
            }
            <div className={styles.card} style={{ borderColor: colorType }} onClick={() => setShowModal(true)}>
                <section className={styles.idSection}>
                    <div className={styles.idContainer} style={{ backgroundColor: colorType }}>
                        <span>{id}</span>
                    </div>
                </section>
                <section className={styles.cardInfoSection}>
                    <div className={styles.cardImage}>
                        <Image 
                            src={`${image}`} 
                            alt="No image available" 
                            width={120} 
                            height={120}
                        />
                    </div>
                    <span>{capitalizeFirstLetter(name)}</span>
                </section>
            </div>
        </>
    )
}