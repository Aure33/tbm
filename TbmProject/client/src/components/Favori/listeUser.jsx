import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AjouterProfil from '../../../src/components/Favori/ajouterProfil';

function ListeUser() {
    const [listUser, setListUser] = useState([]);

    const chargerListUser = async () => {
        try {
            const response = await axios.get();
            setListUser(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des profiles', error);
        }
    };

    useEffect(() => {
        chargerListUser();
        const interval = setInterval(() => {
            chargerListUser();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <ul>
                {listUser.map((user) => (
                    <li key={user.nom}>
                        <Link to={`/profile/${user.name}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
            <AjouterProfil />
            <Link to="/">Retour à la page principale</Link>
        </>
    );
}

export default ListeUser;
