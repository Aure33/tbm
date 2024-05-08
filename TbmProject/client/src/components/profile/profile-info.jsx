import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams  } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import AjouterBusFavori from './ajouterBusFavori';

function ListeUser() {
    const [infoUser, setInfoUser] = useState([]);
    const { profile } = useParams();


    useEffect(() => {
        const chargerInfoUser = async () => {
            try {
                const response = await axios.get(`/api/user/info-user?nom=${profile}`);
                setInfoUser(response.data);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };

        chargerInfoUser();
    }, [profile]); 

    const supprimerUser = async () => {
        try {
            await axios.delete(`/api/user/supprimer-user?nom=${profile}`);
            toast.success('Le profile a bien été supprimé');
            window.location.href = '/tbm/profiles/';
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <h3>Wsh {infoUser.nom}</h3>
            <div>  
            <AjouterBusFavori nom={infoUser.nom} />
            <button onClick={supprimerUser}>Supprimer le profil</button>
            </div>
            <Link to="/tbm/profiles">Retour à la liste des profils</Link>
            <Toaster 
              position="top-right"
              reverseOrder={false}
            />

        </>
    );
}

export default ListeUser;
