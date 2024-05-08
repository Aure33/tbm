import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

const BusList = ({searchValue}) => {
  const [searchResults, setSearchResults] = useState([]);

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

  const ajouterBusFavori = async (idBus) => {
    try {
      await axios.post(`/api/user/ajouter-bus-favori?idBus=${idBus}`);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du bus favori', error);
    }
  };

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
    }, 400);

    // Nettoyer le timeout précédent à chaque changement de terme de recherche
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

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
                          <img
                            src={`./ImagesBus/${extractValue(route.line)}.svg`}
                            alt="logo"
                            style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }}
                          />
                          {result.name} - {route.name}</p>
                          <button onClick={() => ajouterBusFavori(route.id)}>Ajouter aux favoris</button>
                    </div>
                  ))
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
    </>
  );
}

export default BusList;