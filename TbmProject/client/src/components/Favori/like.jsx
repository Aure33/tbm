import { useMutation } from 'react-query';
import PropTypes from 'prop-types';

const isLikedMap = {
    true: "❤️",
    false: "🤍"
}

export const Like = ({ isLiked, routeLineId, stopPointId, routeLine, routeId, nomUser, nomArret, nomDestination }) => {

    const updateLike = useMutation({
        mutationFn: () => {
            if (isLiked) {
                return fetch('/remove-favori', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ isLiked })
                })
            }
            return fetch('/add-favori', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isLiked })
            })
        }
    })

    const color = isLiked ? "red" : "white";

    return (
        <button onClick={updateLike.mutate} style={{ backgroundColor: "transparent", border: "none", color: color }}>{isLikedMap[isLiked]}</button>
    )
}

Like.propTypes = {
    isLiked: PropTypes.bool.isRequired,
    routeLineId: PropTypes.number, // Add the appropriate type for routeLineId
    stopPointId: PropTypes.number, // Add the appropriate type for stopPointId
    routeLine: PropTypes.string, // Add the appropriate type for routeLine
    routeId: PropTypes.number, // Add the appropriate type for routeId
    nomUser: PropTypes.string, // Add the appropriate type for nomUser
    nomArret: PropTypes.string, // Add the appropriate type for nomArret
    nomDestination: PropTypes.string // Add the appropriate type for nomDestination
};
