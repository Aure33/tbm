import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AjouterProfil from './ajouter-profil';

export function ListeUser() {
    const [listUser, setListUser] = useState([]);

    const chargerListUser = async () => {
        try {
            const response = await axios.get(`/api/user/liste-user`);
            setListUser(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des profiles', error);
        }
    };

    useEffect(() => {
        chargerListUser();
        const interval = setInterval(() => {
            chargerListUser();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <ul>
                {listUser.map((user) => (
                    <li key={user.nom}>
                        <Link to={`/tbm/profile/${user.nom}`}>{user.nom}</Link>
                    </li>
                ))}
            </ul>
            <AjouterProfil />
            <Link to="/tbm/">Retour à la page principale</Link>
        </>
    );
}