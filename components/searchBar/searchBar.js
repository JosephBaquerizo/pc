import { GoSearch } from "react-icons/go";
import styles from "./searchBar.module.css";


export default function SearchBar({ searchContent, searchFunction, searchPokemon }) {

    const onSearchChange = (e) => {
        searchFunction(e.target.value);
    }

    return (
        <div className={styles.searchBarContainer}>
            <input
                onChange={onSearchChange} 
                className={styles.searchBar} 
                type="text"
                placeholder="Search pokemons by name or id..." 
                spellCheck="false"
                value={searchContent}
            />
            <div className={styles.searchBarIconContainer} onClick={searchPokemon}>
                <GoSearch className={styles.searchBarIcon} />
            </div>
        </div>
    )
}