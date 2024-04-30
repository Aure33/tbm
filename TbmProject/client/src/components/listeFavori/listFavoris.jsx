import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AfficherBusFavori from './afficherBusFavori';

const ListeFavoris = () => {
    const currentUser = useSelector(state => state.currentUser);
    return (
        <div>
            <Link to="/tbhess">Retour à la page principale</Link>
            <h2 style={{ textAlign: 'center' }}>Bus favori</h2>
            <div id='liste-favori'></div>
            {currentUser.favoris.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Pas de favoris</p>
            ) : (
                currentUser.favoris.map((favori, index) => (
                    <AfficherBusFavori key={index} favori={favori} />
                ))
            )}
        </div>
    );
    
}


export default ListeFavoris;