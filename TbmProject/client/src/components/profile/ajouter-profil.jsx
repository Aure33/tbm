import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SearchBarBus from "../voirBus/search-bar.js";

function ListeUser() {
    const [searchValue, setSearchValue] = useState("")
    const handleSearchInputChange = (searchValue) => {
        setSearchValue(searchValue);
    };

    const ajouterUser = async () => {
        try {
            // Vérifier si l'API existe avant d'envoyer la requête
            if (typeof axios.post === 'function') {
                await axios.post(`/api/user/ajouter-user?nom=${searchValue}`);
                toast.success('Le profile a bien été supprimé');
                window.location.href = `/tbm/profile/${searchValue}`;
            } else {
                // L'API n'existe pas, afficher un message d'erreur
                toast.error("Le back arrive l'équipe");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <SearchBarBus onSearchInputChange={handleSearchInputChange} placeholder="Ajouter un profil" />
            <button onClick={ajouterUser}>Ajouter le profil</button>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

        </>
    );
}

export default ListeUser;
