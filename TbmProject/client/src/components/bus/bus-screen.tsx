import { Destination } from '@/types';
import { useBusDetails } from '@hooks/use-bus-details';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BusLine } from './bus-line';

const BusScreen = () => {
    const [urlParams] = useSearchParams();
    const line = urlParams.get("line") || "";
    const stop_point = urlParams.get("stop_point") || "";
    const lineID = urlParams.get("lineID") || "";
    const route = urlParams.get("route") || "";


    const transportLine = {
        id: lineID,
        name: line,
    }

    const {isLoading, data: busData } = useBusDetails({line: line, lineID: lineID, route: route, stopPoint: stop_point});

    const formatTime = (dateString: string) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options as Intl.DateTimeFormatOptions);
    }
    
    const updateWaitTime = (departureTime: string) => {
        const now = new Date();
        const timeDifference = Math.floor((Number(new Date(departureTime)) - Number(now)) / 1000);
        const hours = Math.floor(timeDifference / 3600);
        const minutes = Math.floor((timeDifference % 3600) / 60);
        const seconds = timeDifference % 60;
        let moyenDeTransport = "Bus";
        if (["59", "60", "61", "62"].includes(lineID)) moyenDeTransport = "Tram";
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
            {busData && (
                <>
                    <BusLine busLine={transportLine}/>
                    {busData.destinations.length !== 0 ? (
                        <>
                            {
                                Object.keys(busData.destinations).map((destinationId: string, index) => (
                                    <div key={index}>
                                        <h2>{busData.destinations[destinationId][0].destination_name}</h2>
                                        {busData.destinations[destinationId].map((entry: Destination, entryIndex: number) => (
                                            <div key={entryIndex}>
                                                <p>Prochain départ: {formatTime(entry.departure)}</p>
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
            )}
            {isLoading && <p>Chargement...</p>}
            <Link to="/">Retour à la page principale</Link>
        </div>
    );
}
export default BusScreen;
