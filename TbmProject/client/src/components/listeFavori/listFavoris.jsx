import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AfficherBusFavori from './afficherBusFavori';

const ListeFavoris = () => {
    const currentUser = useSelector(state => state.currentUser);
    return (
        <div>
            <Link to="/">Retour à la page principale</Link>
            <>
            <h2 align="center">Bus favori</h2>
            </>
            <div id='liste-favori'></div>
                {currentUser.favoris.map((favori, index) => (
                    <AfficherBusFavori key={index} favori={favori} />
                ))}
        </div>
    );
}


export default ListeFavoris;