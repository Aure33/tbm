/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const BusScreen = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const line = params.get("line");
    const stop_point = params.get("stop_point");
    const lineID = params.get("lineID");
    const route = params.get("route");

    const [busData, setBusData] = useState(null);

    // Fonction pour effectuer une nouvelle requête toutes les secondes
    const fetchData = () => {
        fetch(`https://ws.infotbm.com/ws/1.0/get-realtime-pass-by-id/${line}/${stop_point}/${lineID}/${route}`)
            .then((response) => response.json())
            .then((data) => setBusData(data))
            .catch((error) => console.error('Error fetching bus data', error));
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
    
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
                    <img src={`../ImagesBus/${lineID}.svg`} alt="logo" style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }} />
                    {busData.destinations.length !== 0 ? (
                        <>
                            {
                                Object.keys(busData.destinations).map((destinationId, index) => (
                                    <div key={index}>
                                        <h2>{busData.destinations[destinationId][0].destination_name}</h2>
                                        {busData.destinations[destinationId].map((entry, entryIndex) => (
                                            <div key={entryIndex}>
                                                <div>
                                                <p>Prochain départ: {formatTime(entry.departure)}</p>
                                                </div>
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
            <Link to="/tbhess">Retour à la page principale</Link>
        </div>
    );
}
export default BusScreen;
