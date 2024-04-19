/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Like } from './like';

const AjouterBusFavori = ({ searchValue, infoUser }) => {
  const [searchResults, setSearchResults] = useState([]);

  const isFavori = (route) => {
    return infoUser.favoris.some((favori) => favori.route === route);
  };

  const addFavori = async (routeLineId, stopPointId, routeLine, routeId) => {
    try {
      var route = `line=${routeLineId}&stop_point=${stopPointId}&lineID=${routeLine}&route=${routeId}`;
      await axios.post('/add-favori', { name: infoUser.name, routeLineId, stopPointId, routeLine, routeId, route });
      toast.success('Le bus a bien été ajouté aux favoris');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteFavori = async (routeLineId, stopPointId, routeLine, routeId) => {
    try {
      var route = `line=${routeLineId}&stop_point=${stopPointId}&lineID=${routeLine}&route=${routeId}`;
      await axios.delete(`/delete-favori?name=${infoUser.name}`, { data: { route } });
      toast.success('Le bus a bien été supprimé des favoris');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const extractValue = (line) => {
    // si le nom de la ligne commence par Flex'Night, renvoyer la valeur du caractere juste apres
    if (line.name && line.name.startsWith('Flex\'Night')) {
      return `TBN${line.name.charAt(11)}`;
    }
    if (line.name && line.name.includes(' ')) {
      // S'il y a un espace dans le nom, prendre la valeur après le dernier espace
      const lastSpaceIndex = line.name.lastIndexOf(' ');
      const valueAfterSpace = line.name.substring(lastSpaceIndex + 1);

      // Vérifiez si la valeur après l'espace est un chiffre et sa taille n'est pas égale à 1
      if (/^\d+$/.test(valueAfterSpace) && valueAfterSpace.length !== 1) {
        return valueAfterSpace;
      }
    }

    // Si la valeur après l'espace n'est pas un chiffre ou si sa taille est egale à 1, prendre la valeur des chiffres après le dernier ":"
    if (line.id && line.id.includes(':')) {
      const lastColonIndex = line.id.lastIndexOf(':');
      return line.id.substring(lastColonIndex + 1);
    }
    // surprise
    return 'gragawan';
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchValue.length < 3) {
        setSearchResults([]);
        return;
      }

      let listBus = [];
      const response = await axios.get(`https://ws.infotbm.com/ws/1.0/get-schedule/${searchValue}?referer=www`);
      if (response.data.length === 0) {
        setSearchResults([]);
        return;
      }
      for (let i = 0; i < response.data.length; i++) {
        const stop = response.data[i].url;
        const response2 = await axios.get(stop);
        if (response2.length !== 0) {
          let responseTMP =
          {
            id: response2.data.id,
            name: response2.data.name,
            stopPoints: [],
          };
          if (response2.data.stopPoints) {
            for (let j = 0; j < response2.data.stopPoints.length; j++) {
              const stopPoint = response2.data.stopPoints[j].id;
              // on enleve les bus scolaires et les trains pcq ca fait chier
              if (stopPoint.substring(11, 14) !== 'TBS' && stopPoint.substring(11, 14) !== 'BTD' && stopPoint.substring(11, 14) !== 'SNC') {
                responseTMP.stopPoints.push(response2.data.stopPoints[j]);
              }
            }
          }
          listBus.push(responseTMP);
        }
      }

      setSearchResults(listBus);
    }, 300);

    // Nettoyer le timeout précédent à chaque changement de terme de recherche
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, infoUser]);

  return (
    <>
      <div className="listBus">
        {searchResults.map((result) => (
          <div key={result.id}>
            {result.stopPoints && result.stopPoints.map((stopPoint) => (
              <div key={stopPoint.id}>
                {stopPoint.routes && stopPoint.routes.map((route) => (
                  <div key={route.id}>
                    <p>
                      {isFavori(`line=${route.line.id}&stop_point=${stopPoint.id}&lineID=${extractValue(route.line)}&route=${route.id}`) ?
                        <button onClick={() => deleteFavori(route.line.id, stopPoint.id, extractValue(route.line), route.id)} style={{ backgroundColor: "transparent", border: "none", color: "red" }}>❤️</button> :
                        <button onClick={() => addFavori(route.line.id, stopPoint.id, extractValue(route.line), route.id)} style={{ backgroundColor: "transparent", border: "none", color: "white" }}>🤍</button>
                      }
                      <Like />
                      <Link
                        to={`voir-horaires?line=${route.line.id}&stop_point=${stopPoint.id}&lineID=${extractValue(route.line)}&route=${route.id}`}
                        style={{ color: "white" }}
                      >
                        <img
                          src={`../ImagesBus/${extractValue(route.line)}.svg`}
                          alt="logo"
                          style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }}
                        />
                        {result.name} - {route.name}
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  );
};

export default AjouterBusFavori;