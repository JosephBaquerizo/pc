import { useEffect, useState , useRef } from "react";
import Image from "next/image";
import Spinner from "../spinner/spinner";
import styles from "./cardModal.module.css";


export default function CardModal ({ closeModal, pokemonInfo, name, image }) {

    const id = pokemonInfo.id;
    const height = pokemonInfo.height;
    const weight = pokemonInfo.weight;
    const types = pokemonInfo.types.map((item) => {
        return item.type.name;
    });
    
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const getTypeString = (arr) => {
        let typeString = "";
        arr.forEach((item, index) => {
            if (index !== arr.length - 1) {
                typeString += item + " / ";
            } else {
                typeString += item;
            }
        });
        return typeString;
    }

    useEffect(() => {
        const loadDescription = async () => {
            setLoading(true);
            try {
                const pokemon = await fetch(`https://pokeapi.co/api/v2/characteristic/${id}/`);
                const pokemonJSON = await pokemon.json();
                const descriptions = pokemonJSON.descriptions.filter((item) => {
                    return item.language.name === "en";
                });
                const pokemonDescription = descriptions.length ? descriptions[0].description : "";
                setDescription(pokemonDescription);
            } catch(error) {
                console.log(error);
            }
        }
        loadDescription();
        setLoading(false);
    }, []);

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modal}>
                <section className={styles.closeSection}>
                    <button onClick={closeModal}>x</button>
                </section>
                {
                    !loading
                    ?
                    <>
                        <span className={styles.name}>{name}</span>
                        <section className={styles.imageSection}>
                            <Image 
                                src={`${image}`} 
                                alt="No image available" 
                                width={120} 
                                height={120}
                            />
                        </section>
                        <section className={styles.infoSection}>
                            <div className={styles.infoBlock}>
                                <span className={styles.parameter}>id</span>
                                <span>{id}</span>
                            </div>
                            <div className={styles.infoBlock}>
                                <span className={styles.parameter}>height</span>
                                <span>{height} m</span>
                            </div>
                            <div className={styles.infoBlock}>
                                <span className={styles.parameter}>weight</span>
                                <span>{weight} kg</span>
                            </div>
                            <div className={styles.infoBlock}>
                                <span className={styles.parameter}>type</span>
                                <span>{getTypeString(types)}</span>
                            </div>
                        </section>
                        <section className={styles.phrase}>
                            <span>{description !== "" ? `"${description}"` : "Uncomfortable silence..."}</span>
                        </section>
                    </>
                    :
                    <span>Loading...</span>
                }
            </div>
        </div>
    )
}