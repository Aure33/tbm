import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SearchBarBus from "../../../src/components/voirBus/searchBar";


function ListeUser() {
    const [searchValue, setSearchValue] = useState("")
    const handleSearchInputChange = (searchValue) => {
        setSearchValue(searchValue);
    };

    const ajouterUser = async () => {
        try {
            // post searchValue in the body of the request
            await axios.post('/create', { name: searchValue });
            toast.success('Le profile a bien été ajouté');
            window.location.href = `/profile/${searchValue}`;
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
