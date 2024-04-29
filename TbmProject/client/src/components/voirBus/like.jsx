import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/store/currentUserReducer';
import { useSelector } from 'react-redux';

const isLikedMap = {
    true: "❤️",
    false: "🤍"
}

export const Like = ({ routeLineId, stopPointId, routeLine, routeId, uid, nomArret, nomDestination }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    var route = `${routeLineId}/${stopPointId}/${routeLine}/${routeId}`;
    const isFavori = (route) => {
        return currentUser.favoris.some((favori) => favori.route === route);
      };
    const updateLike = useMutation({
        mutationFn: async () => {

            try {
                // var listFavori = [];
                var body = {
                    routeLineId: routeLineId,
                    stopPointId: stopPointId,
                    routeLine: routeLine,
                    routeId: routeId,
                    uid: uid,
                    nomArret: nomArret,
                    nomDestination: nomDestination,
                    route: route
                }
                if (isFavori(route)) {
                    await axios.delete(`/delete-favori?uid=${uid}`, { data: { route } })
                        .then(response => {
                            dispatch(setCurrentUser(response.data));
                            toast.success('Le bus a bien été supprimé des favoris');
                        })
                        .catch(error => {
                            console.error("Erreur lors de la mise à jour du document : ", error);
                        });
                } else {
                    await axios.post('/add-favori', body)
                        .then(response => {
                            dispatch(setCurrentUser(response.data));
                            toast.success('Le bus a bien été ajouté aux favoris');
                        })
                        .catch(error => {
                            console.error("Erreur lors de la mise à jour du document : ", error);
                        });
                }
            }
            catch (error) {
                toast.error('Erreur lors du changement de favoris');
            }
        }
    });

    const color = isFavori(route) ? "red" : "white";
    return (
        <>
        <p>{isLikedMap[isFavori]}</p>
            <button onClick={updateLike.mutate} style={{ backgroundColor: "transparent", border: "none", color: color }}>{isLikedMap[isFavori(route)]}</button>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    )
}

Like.propTypes = {
    routeLineId: PropTypes.string, // Add the appropriate type for routeLineId
    stopPointId: PropTypes.string, // Add the appropriate type for stopPointId
    routeLine: PropTypes.string, // Add the appropriate type for routeLine
    routeId: PropTypes.string, // Add the appropriate type for routeId
    uid: PropTypes.string, // Add the appropriate type for nomUser
    nomArret: PropTypes.string, // Add the appropriate type for nomArret
    nomDestination: PropTypes.string // Add the appropriate type for nomDestination
};
