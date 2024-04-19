import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams  } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from "../../components/voirBus/searchBar";
import AjouterBusFavori from "../../components/Favori/ajouterBusFavori";

function ListeUser() {
    const [infoUser, setInfoUser] = useState([]);
    const { profile } = useParams();
    const [searchValue, setSearchValue] = useState("")
    const handleSearchInputChange = (searchValue) => {
        setSearchValue(searchValue);
    };

    useEffect(() => {
        const chargerInfoUser = async () => {
            try {
                const response = await axios.get(`/info-user?name=${profile}`);
                setInfoUser(response.data);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };

        chargerInfoUser();
    }, [profile]); 

    const supprimerUser = async () => {
        try {
            await axios.delete(`/delete-user?name=${profile}`);
            toast.success('Le profile a bien été supprimé');
            window.location.href = '/profiles/';
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <h3>Wsh {infoUser.name}</h3>
            <div>  
            <button onClick={supprimerUser}>Supprimer le profil</button>
            </div>
            <SearchBar onSearchInputChange={handleSearchInputChange} placeholder="Rechercher un arrêt"/>
            <AjouterBusFavori searchValue={searchValue} infoUser={infoUser} />
            <Link to="/profiles">Retour à la liste des profils</Link>
            <Toaster 
              position="top-right"
              reverseOrder={false}
            />

        </>
    );
}

export default ListeUser;
