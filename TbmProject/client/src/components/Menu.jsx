// import SearchBarBus from ".vraiTBHess/SearchBarBus";
import '@/assets/Css/App.css';
import { Link } from "react-router-dom";
import SearchBarBus from "../../src/components/voirBus/searchBar.jsx";
import BusList from "@/components/voirBus/busList.jsx";
import {useState} from "react";
import { useSelector } from 'react-redux';


const Menu = () => {
    const [searchValue, setSearchValue] = useState("")
    const currentUser = useSelector(state => state.currentUser);
    const handleSearchInputChange = (searchValue) => {
        setSearchValue(searchValue);
    };
    return (
        <>
            <SearchBarBus onSearchInputChange={handleSearchInputChange} placeholder="Rechercher un arrêt"/>
            <BusList searchValue={searchValue} />
            {currentUser.uid !== '' && (
            <Link to="/favoris">Voir mes favoris</Link>
            )}
        </>
    );
}

export default Menu;