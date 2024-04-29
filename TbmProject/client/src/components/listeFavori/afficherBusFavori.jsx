/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Like } from '@/components/voirBus/like';

const AfficherBusFavori = (favori) => {
    const currentUser = useSelector(state => state.currentUser);

    const lineID = favori.favori.routeLineId;
    const route = favori.favori.route;
    const routeId = favori.favori.routeId;
    const routeLine = favori.favori.routeLine;
    const nomArret = favori.favori.nomArret;
    const nomDestination = favori.favori.nomDestination;
    const stopPoint = favori.favori.stopPointId;
    const [busData, setBusData] = useState(null);

    // Fonction pour effectuer une nouvelle requête toutes les secondes
    const fetchData = async () =>  {
        fetch(`https://ws.infotbm.com/ws/1.0/get-realtime-pass-by-id/${route}`)
            .then((response) => response.json())
            //.then((data) => setBusData(data))
            .then((data) => trierBus(data))
            .catch((error) => console.error('Error fetching bus data', error));
    };

    function trierBus(busData) {
        Object.keys(busData.destinations).forEach((destinationId) => {
            busData.destinations[destinationId] = busData.destinations[destinationId].filter((entry, index) => index === 0);
        }
        );
        setBusData(busData);
      }

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    
    const updateWaitTime = (departureTime) => {
        const now = new Date();
        const timeDifference = Math.floor((new Date(departureTime) - now) / 1000);
        const hours = Math.floor(timeDifference / 3600);
        const minutes = Math.floor((timeDifference % 3600) / 60);
        const seconds = timeDifference % 60;
        let moyenDeTransport = "Bus";
        if (lineID === "59" || lineID === "60" || lineID === "61" || lineID === "62") moyenDeTransport = "Tram";
        if (seconds < 0) return `${moyenDeTransport} à l'arrêt !`;
        if (hours > 0) return `${hours}h ${minutes}min ${seconds}s`;
        if (minutes > 0 && minutes <= 1 && seconds <= 1) return `${minutes} minute ${seconds} seconde`;
        if (minutes > 0 && minutes <= 1) return `${minutes} minute ${seconds} secondes`;
        if (minutes > 0 && seconds <= 1) return `${minutes} minutes ${seconds} seconde`;
        if (minutes > 0) return `${minutes} minutes ${seconds} secondes`;
        if (seconds <= 1) return `${seconds} seconde`;
        return `${seconds} secondes`;
    }


    return (
        <div>
            {busData ? (
                <>
                   <p>
                   {currentUser.uid !== '' && (
                      <Like
                        routeLineId={lineID}
                        stopPointId={stopPoint}
                        routeLine={routeLine}
                        routeId={routeId}
                        uid={currentUser.uid}
                        nomArret={nomArret}
                        nomDestination={nomDestination}
                      />
                    )}
                    <img src={`./ImagesBus/${routeLine}.svg`} alt="logo" style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }} /> 
                    {nomArret} - {nomDestination}
                    </p>
                    {busData.destinations.length !== 0 ? (
                        <>
                            {
                                Object.keys(busData.destinations).map((destinationId, index) => (
                                    <div key={index}>
                                        <h2>{busData.destinations[destinationId][0].destination_name}</h2>
                                        {busData.destinations[destinationId].map((entry, entryIndex) => (
                                            <div key={entryIndex}>
                                                <p>Attente: {updateWaitTime(entry.departure)}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            }
                        </>
                    ) : (
                        <p>Pas de bus en circulation</p>
                    )}

                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
export default AfficherBusFavori;
